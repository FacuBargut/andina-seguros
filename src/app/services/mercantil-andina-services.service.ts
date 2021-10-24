import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from "rxjs";


import * as observable from 'rxjs';

type ValidationErrors = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root'
})
export class MercantilAndinaServicesService {

  constructor(private http:Http) { }

  provincias: Response[] = [];
  // last20Years$ = new Subject<any[]>();

  getProvincias():Observable<any>  {
    return this.http.get('https://apis.datos.gob.ar/georef/api/provincias')
    .pipe(
      map(
        data=>data.json().provincias
      )
    )
  }

  getMunicipios(id:number):Observable<any>{
    return this.http.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre&max=100`)
    .pipe(
      map(
        data=>data.json().municipios
      )
    )
  }

  userIsExist(usuario:string) :Observable<any> {
    return this.http.get(`https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/usuarios?nombre=${usuario}`)
    .pipe(
      map(
        data=>data.json() 
      )
    )
    
  }

  getMarcas() :Observable<any> {
    return this.http.get(`https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas`)
    .pipe(
      map(
        data=>data.json() 
      )
    )
    
  }

  getModelos(codigo:string, anio:string) :Observable<any> {
    return this.http.get(`https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas/${codigo}/${anio}`)
    .pipe(
      map(
        data=>data.json() 
      )
    )
    
  }

  getVersiones(codigo:string, anio:string, modelo:string) :Observable<any> {
    return this.http.get(`https://servicios.qamercantilandina.com.ar/api/v1/vehiculos/marcas/${codigo}/${anio}/${modelo}`)
    .pipe(
      map(
        data=>data.json() 
      )
    )
    
  }

  getLast20Years() {
    // this.last20Years$ = new Subject();
    let actualYear = (new Date()).getFullYear();
    let años: any[] = []
    for(let i=0; i<=20; i++){
        
      let objAño = {
        value: actualYear - i
      }
      años.push(objAño)
    }
    return años
  }

  getCoberturas() :Observable<any> {
    return this.http.get(`https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/coberturas`)
    .pipe(
      map(
        data=>data.json() 
      )
    )
    
  }




  // return observable.of('usuario' === control.value).pipe(
  //   map(result => result ? { invalid: true } : null)
  // );

}
