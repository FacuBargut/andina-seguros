import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule  } from './material/material.module';
import { PagesModule } from './pages/pages.module';

import { HttpModule } from '@angular/http';



//Angular material

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PagesModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
