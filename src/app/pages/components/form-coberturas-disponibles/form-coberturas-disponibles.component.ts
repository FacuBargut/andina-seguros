import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MercantilAndinaServicesService } from 'src/app/services/mercantil-andina-services.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export enum SelectType {
  single,
  multiple
}


@Component({
  selector: 'app-form-coberturas-disponibles',
  templateUrl: './form-coberturas-disponibles.component.html',
  styleUrls: ['./form-coberturas-disponibles.component.css']
})
export class FormCoberturasDisponiblesComponent implements OnInit {

  coberturaForm !: FormGroup;

  ratingStyle = {
    starsStyle: {'height' : '22px', 'width' : '22px'},
    ratingStyle: {'font-size' : '18px'},
    countStyle: {'font-size' : '14px'}
  }

  displayedColumns: string[] = [
    "select",
    "codigo",
    "titulo",
    "descripcion",
    "franquicia",
    "costo",
    "puntaje"
  ];

   coberturas: Coberturas [] = [];
   dataSource = new MatTableDataSource<Coberturas>();
   selection = new SelectionModel<Coberturas>(true, []);
   displayType = SelectType.single;
   
   @Output() index: EventEmitter<any> = new EventEmitter();

  constructor( private service: MercantilAndinaServicesService,
               private fb: FormBuilder
    ) { 
      this.buildForm();
    }
  ngOnInit(): void {
    this.service.getCoberturas().subscribe(
      data=>{
        console.log(data)
        this.coberturas = data;
        this.dataSource = new MatTableDataSource<Coberturas>(this.coberturas);
        console.log(this.dataSource)
      }
    )

    this.coberturaForm.valueChanges.subscribe(
      data=>{
        if(this.coberturaForm.valid){
          this.index.emit(2)
        }else{
          this.index.emit(3)
        }
      }
    )
  }

  
  isFormValid():boolean{
    if(this.coberturaForm.valid){
      return true;
    }else{
      return false
    }
  }

  buildForm(){
    this.coberturaForm = this.fb.group({
      checkbox : ['', Validators.required]
    })
  }

  onChange(typeValue: number) {
    this.displayType = typeValue;
    this.selection.clear();
  }

  selectHandler(row: Coberturas) {
    if (this.displayType == SelectType.single) {
      if (!this.selection.isSelected(row)) {
        this.selection.clear();
      }
    }
    this.selection.toggle(row);
  }



  


 }
