import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MercantilAndinaServicesService } from 'src/app/services/mercantil-andina-services.service';

@Component({
  selector: 'app-form-datos-vehiculo',
  templateUrl: './form-datos-vehiculo.component.html',
  styleUrls: ['./form-datos-vehiculo.component.css']
})
export class FormDatosVehiculoComponent implements OnInit {
  vehicleForm!: FormGroup;
  marcas:any[]= [];
  last20years:any[] = [];
  modelos:any[] = [];
  versiones:any[] = [];
  constructor(private fb: FormBuilder,
              private services: MercantilAndinaServicesService
    ) {
      this.buildForm();
     }

  @Output() index: EventEmitter<any> = new EventEmitter();
  @Input('datos') set datos(value:any){
    console.log(value)
    this.completarForm(value);
  };

  ngOnInit(): void {
    this.obtenerMarcas();
    this.obtenerUltimos20Años();

  }

  completarForm(value:any){
    this.vehicleForm.setValue({
      marca: value.marca,
      anio: value.anio,
      modelo: value.modelo,
      version: value.version
    })
    this.vehicleForm.disable()
  }

  buildForm(){
    this.vehicleForm = this.fb.group({
      marca:['', [Validators.required]],
      anio:['', [Validators.required]],
      modelo:['', [Validators.required]],
      version:[''],
    })

    this.vehicleForm.valueChanges
    .subscribe(value => {
      if (this.vehicleForm.valid) {
        this.index.emit(2)
      }
      else {
        this.index.emit(3)
      }
    })
  }

  isFormValid():boolean{
    if(this.vehicleForm.valid){
      return true;
    }else{
      return false
    }
  }

  obtenerMarcas(){
    this.services.getMarcas().subscribe(
      data=>{
        this.marcas = data;
        console.log(this.marcas)
      }
    )
  }

  getVehicleInformation(){
    this.getModelos()
    this.getVersiones();
  }

  getModelos(){
    if(this.vehicleForm.controls['marca'].value == "" || this.vehicleForm.controls['anio'].value == ""){
      return;
    }

    console.log(this.vehicleForm.controls['marca'].value, this.vehicleForm.controls['anio'].value)
    this.modelos = [];

    this.services.getModelos(this.vehicleForm.controls['marca'].value, this.vehicleForm.controls['anio'].value).subscribe(
      data=>{
        this.modelos = data;
      }
    )

  }

  getVersiones(){

    if(this.vehicleForm.controls['marca'].value == "" || this.vehicleForm.controls['anio'].value == "" || this.vehicleForm.controls['modelo'].value == ""){
      return;
    }

    console.log(this.vehicleForm.controls['marca'].value, this.vehicleForm.controls['anio'].value)
    this.versiones = [];

    this.services.getVersiones(this.vehicleForm.controls['marca'].value,
                               this.vehicleForm.controls['anio'].value,
                               this.vehicleForm.controls['modelo'].value
                               ).subscribe(
      data=>{
        this.versiones = data;
        console.log(this.versiones)
      }
    )

  }

  obtenerUltimos20Años(){
    this.last20years = this.services.getLast20Years();
  }

  getErrorMessage(field:string):string{
    let message:string = "";
    if(this.vehicleForm.get(field)?.errors?.required){
      message = "Este campo es obligatorio"
    }
    return message
  }

  isValidField(field: string) {
    return (
      this.vehicleForm.get(field)?.touched || this.vehicleForm.get(field)?.dirty
    )
  }

}
