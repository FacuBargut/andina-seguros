import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  nextButton!: boolean
  backButton!: boolean
  @Input() subject!: Subject<string>;
  lastForm: boolean = false;
  @Output() instruccion: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
    this.subject.subscribe((text: string) => {
      console.log("index",text)
      this.desactivarBotones();
      if(text == "0"){
        this.lastForm === false;
        console.log(this.lastForm)
        this.desactivarBotones();
      }
      if(text == "1"){
        this.lastForm = false;
        console.log(this.lastForm)
        this.activarNextButton();
      }
      if(text == "2"){
        this.lastForm = false;
        console.log(this.lastForm)
        this.activarBotones();
      }
      if(text == "3"){
        this.lastForm = false;
        console.log(this.lastForm)
        this.desactivarNextButtonYActivarBackButton();
      }

      if(text == "4"){
        this.lastForm = false;
        console.log(this.lastForm)
        this.desactivarBackButtonYActivarNextButton();
      }

      if(text == '5'){
        this.lastForm = true;
        this.lastForm = true;
        console.log(this.lastForm)
        this.activarBackButton();
      }

    });

  }
  activarBotones(){
    this.nextButton = true;
    this.backButton = true
  }
  desactivarBotones(){
    this.nextButton = false;
    this.backButton = false;
  }

  activarNextButton(){
    this.nextButton = true;
  }

  activarBackButton(){
    this.backButton = true;
  }

  desactivarNextButtonYActivarBackButton(){
    this.nextButton = false;
    this.backButton = true;
  }

  desactivarBackButtonYActivarNextButton(){
    this.nextButton = true;
    this.backButton = false;
  }

  nextForm(){
    this.instruccion.emit('siguiente')
  }

  previousForm(){
    this.instruccion.emit('anterior')
  }

  okButton(){
    alert("Datos enviados")
  }

  

  

}
