import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormCoberturasDisponiblesComponent } from '../form-coberturas-disponibles/form-coberturas-disponibles.component';
import { FormDatosPersonalesComponent } from '../form-datos-personales/form-datos-personales.component';
import { FormDatosVehiculoComponent } from '../form-datos-vehiculo/form-datos-vehiculo.component';


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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor() { }
  @Output() onInfo: EventEmitter<string> = new EventEmitter<string>();
  @Input() moveForm!: Subject<string>;

  @ViewChild(FormDatosVehiculoComponent) datosVehiculo!:FormDatosVehiculoComponent;
  @ViewChild(FormDatosPersonalesComponent) datosPersonales!:FormDatosPersonalesComponent;
  @ViewChild(FormCoberturasDisponiblesComponent) coberturasDisponibles!:FormCoberturasDisponiblesComponent;

  selected = new FormControl(0);

  FormDatosPersonales = new Subject<string>();
  FormDatosVehiculo = new Subject<string>();
  cobertura = new Subject<Coberturas[]>();

  ngOnInit(): void {
    this.moveForm.subscribe((instruccion:string) => {
      console.log("Quiero ver el formulario:", instruccion)
      if(instruccion == 'siguiente'){
        this.selected.setValue(this.selected.value + 1)
      }else if(instruccion == 'anterior'){
        this.selected.setValue(this.selected.value - 1)
      }
    })
  }

  test( indexTab:any){
    console.log(indexTab.index)
    if(indexTab.index === 0){
      if(this.datosPersonales.isFormValid()){
        console.log("Todo bien")
        this.onInfo.emit('4');
      }else{
        this.onInfo.emit('0');
      }
    }

    if(indexTab.index === 1){
      if(this.datosVehiculo.isFormValid()){
        this.onInfo.emit('2');
        
      }else{
        this.onInfo.emit('3');
        
      }
    }

    if(indexTab.index === 2){
      if(this.coberturasDisponibles.isFormValid()){
        this.onInfo.emit('2');
      }else{
        this.onInfo.emit('3');
      }
    }

    if(indexTab.index === 3){
      
      this.FormDatosPersonales.next(this.datosPersonales.personalForm.value)
      this.FormDatosVehiculo.next(this.datosVehiculo.vehicleForm.value)
      this.cobertura.next(this.coberturasDisponibles.selection.selected)
      this.onInfo.emit('5');
    }
  }


  procesarIndex(index:string){
    this.onInfo.emit(index);
    console.log(this.coberturasDisponibles.selection.selected)
  }

}
