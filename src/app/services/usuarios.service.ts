import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, delay} from 'rxjs/operators';
import { UsuariosModel } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://ludyapp-d4762-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) { }

  cargarUsuarios() {
    return this.http.get(`${this.url}/usuarios.json`)
    .pipe(map( this.crearArreglo),
    delay(0)
    );
  }

  private crearArreglo(userObj: object | any){
    const usuario: UsuariosModel[]=[];

    Object.keys(userObj).forEach(key => {
      const user: UsuariosModel = userObj[key];
      user.id=key;
      usuario.push(user);
    });
    if(userObj===null){return[];};

    return usuario;
  }


  crearUsuario(usuario: UsuariosModel){
    return this.http.post(`${this.url}/usuarios.json`, usuario)
            .pipe(map((resp: any)=>{
              usuario.id= resp.name;
              return usuario;
            }
            ));
  }

  actUsuario(usuario: UsuariosModel){
    const userTemp ={
      ...usuario
    };
    delete userTemp.id;
    return this.http.put(`${this.url}/usuarios/${usuario.id}.json`,userTemp);
  }

getUsuario(id: string){
  return this.http.get(`${this.url}/usuarios/${id}.json`);
}

borrarUsuario(id: string){
  return this.http.delete(`${this.url}/usuarios/${id}.json`);
}

}
