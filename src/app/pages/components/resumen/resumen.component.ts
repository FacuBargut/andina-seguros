import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export interface Coberturas {
  position: number;
  codigoProducto: number;
  costo: number;
  descripcion: string;
  franquicia: number;
  granizo: boolean;
  numero: number;
  producto: string,
  puntaje: number;
  texto: string;
  titulo: string
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  @Input() datosPersonales!: Subject<string>;
  @Input() datosVehiculo!:Subject<string>;
  @Input() cobertura!:Subject<Coberturas[]>;


  datos : any;
  datosVehiculoTmp: any;
  coberturaTmp:any
  constructor() {

   }

   
  ngOnInit(): void {
    this.datosPersonales.subscribe((datos) =>{

      this.datos = datos;
    })

    this.datosVehiculo.subscribe((datos)=>{

      this.datosVehiculoTmp = datos;
    })

    this.cobertura.subscribe((datos=>{
      this.coberturaTmp = datos[0];

    }))

  }

}
