import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subject = new Subject<string>();
  moveForm = new Subject<string>();


  ngOnInit():void{
    this.subject.subscribe((index: string) => {
    });
    this.moveForm.subscribe((instruccion: string) => {
    });
  }
  
  handleInfo = (info: string) => {
    this.subject.next(info);
  };

  handleForm( instruccion: string){
    this.moveForm.next(instruccion);
  }


  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("Se perderan todos los cambios. Continuar?");
    if (result) {
      
    }
    event.returnValue = false; // stay on same page
  }
  


}
