import { Component, OnInit } from '@angular/core';
import { AreaModel } from 'src/app/models/areas.model';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { AreasService } from '../../services/areas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: AreaModel[]=[];
  data:AreaModel[]=[];
  infouser: UsuariosModel[]=[];
  datauser: UsuariosModel[]=[];
  cont: number | any;
  contInacy: number | any;
  contuser: number | any;
  contInacyuser: number | any;

  constructor(private areaService: AreasService,
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {

    this.areaService.cargarAreas().subscribe(resp => {
      this.info=resp;


      const filtro=this.info.filter(resp => resp.estado===true);
      this.data=filtro;
       this.cont= this.data.length;

       this.contInacy= this.info.length-this.cont;



    });

    this.usuarioService.cargarUsuarios().subscribe(resp => {
      this.infouser=resp;


      const filtro=this.infouser.filter(resp => resp.estado===true);
      this.datauser=filtro;
       this.contuser= this.datauser.length;

       this.contInacyuser= this.infouser.length-this.contuser;





    });
  }

}
