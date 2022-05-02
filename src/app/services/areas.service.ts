import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay } from 'rxjs/operators';
import { AreaModel } from '../models/areas.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private url='https://ludyapp-d4762-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) { }

  cargarAreas() {
    return this.http.get(`${this.url}/areas.json`)
    .pipe(map( this.crearArreglo),
    delay(0)
    );
  }

  private crearArreglo(areasObj: object | any){
    const areas: AreaModel[]=[];

    Object.keys(areasObj).forEach(key => {
      const area: AreaModel = areasObj[key];
      area.id=key;
      areas.push(area);
    });
    if(areasObj===null){return[];};

    return areas;
  }

  crearArea(area: AreaModel){
    return this.http.post(`${this.url}/areas.json`,area)
            .pipe(map((resp: any)=>{
              area.id= resp.name;
              return area;
            }
            ));
  }

  actArea(area: AreaModel){
    const areaTemp ={
      ...area
    };
    delete areaTemp.id;
    return this.http.put(`${this.url}/areas/${area.id}.json`,areaTemp);
  }

  borrarArea(id: string){
    return this.http.delete(`${this.url}/areas/${id}.json`);
  }

}
