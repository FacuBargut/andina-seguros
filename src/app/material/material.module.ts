import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';







@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports:[
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
