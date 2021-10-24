import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { map } from 'rxjs/operators/';

import * as observable from 'rxjs';

import { MercantilAndinaServicesService } from 'src/app/services/mercantil-andina-services.service';


@Component({
  selector: 'app-form-datos-personales',
  templateUrl: './form-datos-personales.component.html',
  styleUrls: ['./form-datos-personales.component.css']
})
export class FormDatosPersonalesComponent implements OnInit {
  private isValidEmail = "^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$";
  private isValidCellPhone = "^[0-9]+$";
  private isValidString = "^[A-Za-z]+$"
  public provincias: any[] = [];
  public municipios: any[] = [];
  personalForm!: FormGroup;
  usuarioExiste: boolean = false;

  soloLectura: boolean = false;

  @Output() index: EventEmitter<any> = new EventEmitter();
  @Input('datos') set datos(value:any){
    this.completarForm(value);
  };

  completarForm(value:any){
    this.personalForm.setValue({
      dni : value.dni,
      apellido: value.apellido,
      nombre: value.nombre,
      mail: value.mail,
      celular: value.celular,
      telefono: value.telefono,
      provincia: value.provincia,
      ciudad: value.ciudad,
      domicilio: value.domicilio,
      usuario: value.usuario,
      contraseña: value.contraseña,
    })
    this.personalForm.disable()
  }

  constructor(private fb: FormBuilder,
    private services: MercantilAndinaServicesService
  ) {

    this.buildForm();

  }

  ngOnInit(): void {
    this.services.getProvincias().subscribe(
      data => {
        this.provincias = data
      }
    )
      setTimeout(() => {
        
        document.getElementById('dni')?.focus();
      }, 500);
  }

  
  isFormValid():boolean{
    if(this.personalForm.valid){
      console.log("El formulario de datos se puede mandar")
      return true;
    }else{
      console.log("El formulario de datos no se puede mandar")
      return false
    }
  }


  buildForm() {
    this.personalForm = this.fb.group({
      dni: ['', [Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(this.isValidCellPhone)]
      ],
      apellido: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern(this.isValidString)
      ]
      ],
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern(this.isValidString)
      ]
      ],
      mail: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      celular: ['', [Validators.required, Validators.pattern(this.isValidCellPhone)]],
      telefono: ['', [Validators.required, Validators.pattern(this.isValidCellPhone)]],
      provincia: ['', [Validators.required]],
      ciudad: ['', Validators.required],
      domicilio: ['', Validators.required],
      usuario: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          this.validarNombreUsuario.bind(this)
        ]
      ],

      contraseña: ['', Validators.required]
    });

    this.personalForm.valueChanges
      .subscribe(value => {
        if (this.personalForm.valid) {
          this.index.emit(1)
        }
        else {
          this.index.emit(0)
        }
      })
  }

  isValidField(field: string) {
    return (
      this.personalForm.get(field)?.touched || this.personalForm.get(field)?.dirty
    )
  }

  getErrorMessage(field: string): string {
    let message: string = "";
    if (this.personalForm.get(field)?.errors?.required) {
      message = "Este campo es obligatorio";
    } else if (this.personalForm.get(field)?.hasError('pattern') && field == "mail") {
      message = "El formato de mail ingresado es incorrecto"
    } else if (this.personalForm.get(field)?.hasError('pattern') && field == "celular") {
      message = "El celular ingresado es incorrecto"
    }
    else if (this.personalForm.get(field)?.hasError('pattern') && field == "telefono") {
      message = "El telefono ingresado es incorrecto"
    }
    else if (this.personalForm.get(field)?.hasError('pattern') && field == "dni") {
      message = "El dni debe ser solo numérico"
    } else if (this.personalForm.get(field)?.hasError('pattern') && field == "nombre") {
      message = "El nombre ingresado es incorrecto"
    } else if (this.personalForm.get(field)?.hasError('pattern') && field == "apellido") {
      message = "El apellido ingresado es incorrecto"
    }
    else if (this.personalForm.get(field)?.hasError('maxlength')) {
      let maxLength = this.personalForm.get(field)?.errors?.maxlength.requiredLength
      let tipoCantidad = 'caracteres';
      if (field == "dni") {
        tipoCantidad = 'dígitos'
      }
      message = `El campo no puede superar los ${maxLength} ${tipoCantidad}`
    } else if (this.personalForm.get(field)?.hasError('minlength')) {
      let minLength = this.personalForm.get(field)?.errors?.minlength.requiredLength
      let tipoCantidad = 'caracteres';
      if (field == "dni") {
        tipoCantidad = 'dígitos'
      }
      message = `El campo no puede tener menos de ${minLength} ${tipoCantidad}`
    }



    return message;
  }

  selectProvincia(id: number) {
    this.municipios = [];
    this.services.getMunicipios(id).subscribe(
      data => {

        this.municipios = data
      }
    )
  }


  validarNombreUsuario(control: AbstractControl) {
    this.services.userIsExist(control.value).subscribe(
      data => {
        this.usuarioExiste = data;
        // console.log("Usuario existe?: ",this.usuarioExiste)
      }
    )

  }



}


