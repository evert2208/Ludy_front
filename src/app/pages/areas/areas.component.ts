import { Component, Input, OnInit } from '@angular/core';
import { AreaModel } from 'src/app/models/areas.model';
import { AreasService } from '../../services/areas.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  @Input() areas: AreaModel[] | undefined;
  area: AreaModel= new AreaModel();
   info: AreaModel[]=[];
    cargando=false;
    getAreas=false;
  constructor(private areaService: AreasService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.areaService.cargarAreas().subscribe(resp => {
      this.info=resp;
      this.cargando=false;
      this.getAreas= true;
    });
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('formulario invalido');
      Swal.fire({
        title: 'incompleto',
        icon: 'error',
        text: 'por favor llene el formulario completo',
        allowOutsideClick: false
      });
      return;
    }



    Swal.fire({
      title: 'espere',
      icon: 'info',
      text: 'guardando info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if(this.area.id) {
      peticion=this.areaService.actArea(this.area);
    }else{
    peticion=this.areaService.crearArea(this.area);
    }

    peticion.subscribe((resp)=>{
      Swal.fire({
        title: this.area.nombre,
        text: 'se actualizo correctamente',
        icon: 'success'

      });
      this.areaService.cargarAreas().subscribe(resp => {
        this.info=resp;
        this.cargando=false;
        this.getAreas= true;
      });
    });
  }

  borrarArea(area: AreaModel|any, i: number){
    Swal.fire({
      title: '¿esta seguro?',
      text: 'desea borrar esta Area?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then(resp =>{
      if(resp.value){
        this.info.splice(i,1);
    this.areaService.borrarArea(area.id).subscribe(resp => {
      this.areaService.cargarAreas().subscribe(resp =>{
        Swal.fire(
          'Area borrada',
          `${ area.nombre } fue eliminada correctamente`,
          'success'
        );
      });

    });

      }
    });

  }

}

