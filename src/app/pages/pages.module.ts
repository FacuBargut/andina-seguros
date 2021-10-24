import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';

import { MaterialModule } from '../material/material.module';
import { FormDatosPersonalesComponent } from './components/form-datos-personales/form-datos-personales.component';
import { FormDatosVehiculoComponent } from './components/form-datos-vehiculo/form-datos-vehiculo.component';
import { FormCoberturasDisponiblesComponent } from './components/form-coberturas-disponibles/form-coberturas-disponibles.component';
import { ResumenComponent } from './components/resumen/resumen.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxRatingStarsModule } from 'ngx-rating-stars'


@NgModule({
  declarations: [
    MainComponent,
    ResumenComponent,
    FormDatosPersonalesComponent,
    FormDatosVehiculoComponent,
    FormCoberturasDisponiblesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatPasswordStrengthModule,
    NgxStarRatingModule,
    NgxRatingStarsModule
    
  ],
  exports:[
    MainComponent,
  ]
})
export class PagesModule { }
