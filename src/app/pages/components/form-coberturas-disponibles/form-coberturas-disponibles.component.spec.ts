import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoberturasDisponiblesComponent } from './form-coberturas-disponibles.component';

describe('FormCoberturasDisponiblesComponent', () => {
  let component: FormCoberturasDisponiblesComponent;
  let fixture: ComponentFixture<FormCoberturasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoberturasDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoberturasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
