import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { UsuariosModel } from '../../models/usuarios.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AreasService } from '../../services/areas.service';
import { AreaModel } from 'src/app/models/areas.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: UsuariosModel= new UsuariosModel();
  info: AreaModel[]=[];
  data:AreaModel[]=[];
  getdatos: UsuariosModel[]=[];
  cargando=false;
    getUser=false;
  public formulario: FormGroup | any;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuariosService,
              private areaService: AreasService,
              private Router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  //  crearUsuario() {
  //   this.formSubmitted = true;
  //   console.log( this.registerForm.value );

  //   if ( this.registerForm.invalid ) {
  //     return;
  //   }

  //   // Realizar el posteo
  //   this.usuarioService.crearUsuario( this.registerForm.value )
  //       .subscribe( resp => {

  //         // Navegar al Dashboard
  //         this.router.navigateByUrl('/');

  //       }, (err) => {
  //         // Si sucede un error
  //         Swal.fire('Error', err.error.msg, 'error' );
  //       });


  // }

  ngOnInit(): void {

    //this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico( id ) );

    this.formulario = this.fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(50)]],
      apellido: ['',[Validators.required, Validators.maxLength(50)]],
      fecha: ['',Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      documento: ['', [Validators.required, Validators.maxLength(7)]],
      area: ['', Validators.required],
      salario: ['', [Validators.required, Validators.maxLength(10)]],
      estado: [true]

    });


    this.areaService.cargarAreas().subscribe(resp => {
      this.info=resp;


      const filtro=this.info.filter(resp => resp.estado===true);
      this.data=filtro;

    });


    this.usuarioService.cargarUsuarios().subscribe(resp => {
      this.getdatos=resp;
      this.cargando=false;
      this.getUser= true;
    })
    // const id: string | any = this.route.snapshot.paramMap.get('id');
    // if(id !== 'nuevo'){
    //   this.usuarioService.getUsuario(id)
    //   .subscribe((resp: UsuariosModel| any) => {
    //     this.usuario=resp;
    //     this.usuario.id=id;
    //   })
    // }
  }

  // crearUsuario(){
  //   console.log(this.formulario.value);
  // }

  guardar(){
    if(this.formulario.invalid){

      Swal.fire({
        title: 'incompleto',
        icon: 'error',
        text: 'por favor llene el formulario completo',
        allowOutsideClick: false
      });
      return;
    } else {


    Swal.fire({
      title: 'espere',
      icon: 'info',
      text: 'guardando info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.usuario.id) {
      // peticion=this.usuarioService.actUsuario(this.usuario);
      this.usuarioService.actUsuario(this.formulario.value).subscribe(resp =>{
        Swal.fire({
          title: 'Guardado',
          text: 'se actualizo correctamente',
          icon: 'success'

        });
      })
    }else{
      const {nombre} = this.formulario.value;

      this.usuarioService.crearUsuario(this.formulario.value).subscribe((resp:any)=>{
        //console.log(resp);
        Swal.fire('Usuario creado', `${nombre} creado correctamente`, 'success' );

      })
    }


    }
  }


  borrarUsuario(usuario: UsuariosModel|any, i: number){
    Swal.fire({
      title: '¿esta seguro?',
      text: 'desea borrar este Usuario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then(resp =>{
      const {id} = this.formulario.value;
      if(resp.value){
        this.info.splice(i,1);
    this.usuarioService.borrarUsuario(this.formulario.id).subscribe(resp => {
      this.usuarioService.cargarUsuarios().subscribe(resp =>{
        const {nombre} = this.formulario.value;
        Swal.fire(
          'Usuario borrado',
          `${ nombre } fue eliminado correctamente`,
          'success'
        );
      });

    });

      }
    });

  }


}
