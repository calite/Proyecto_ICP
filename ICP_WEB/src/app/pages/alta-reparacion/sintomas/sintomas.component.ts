import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.scss']
})
export class SintomasComponent implements OnInit {

  sintomasOpciones: Sintoma[];

  cacheSintomas: [];

  formularioAltaReparacion: FormGroup;

  get sintomasFormArray() {
    return this.formularioAltaReparacion.controls.sintomas as FormArray;
  }

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { // se genera el form en el constructor
    this.cacheSintomas = JSON.parse(localStorage.getItem('Sintomas'))
    this.formularioAltaReparacion = this.formBuilder.group({
      sintomas: new FormArray([], this.comprobarSintomas(1))
    });
  }

  ngOnInit(): void {

    this.cargarSintomas();

  }

  private cargarSintomas() {
    this.apiService.getSintomas()
      .subscribe(sintomas => {
        this.sintomasOpciones = sintomas;
        this.addCheckboxes();
      });
  }

  private addCheckboxes() { //metdo para añadir los checkboxes al FormArray del formulario



    if(this.cacheSintomas) {
      for (let i = 0; i < this.sintomasOpciones.length; i++) {

        if (this.sintomasOpciones[i]['id_Sintoma'] == this.cacheSintomas[i]) {
          this.sintomasFormArray.push(new FormControl(true))
        } else {
          this.sintomasFormArray.push(new FormControl(false))
        }
  
      }
    } else {
      this.sintomasOpciones.forEach(() =>
      this.sintomasFormArray.push(new FormControl(false))
    );
    }
    

  }

  private comprobarSintomas(min = 1) {
    const validador: ValidatorFn = (formArray: FormArray) => {
      const totalSeleccionados = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSeleccionados >= min ? null : { required: true }
    };
    return validador;
  }



  submitFormularioAltaReparacion() {
    if (this.formularioAltaReparacion.valid) {

      //almacenamos en local

      const sintomasSeleccionados = this.formularioAltaReparacion.value.sintomas
        .map((checked, i) => checked ? this.sintomasOpciones[i].id_Sintoma : 0)
        .filter(v => v !== null);

      const repuestosNecesarios = this.formularioAltaReparacion.value.sintomas
        .map((checked, i) => checked ? this.sintomasOpciones[i].id_Repuesto : 0)
        .filter(v => v !== null);

      localStorage.setItem('Sintomas', JSON.stringify(sintomasSeleccionados));
      localStorage.setItem('Repuestos', JSON.stringify(repuestosNecesarios));

      //siguiente
      this.router.navigate(['./alta-reparacion/transporte'])

    }
  }

  atras() {
    this.router.navigate(['./alta-reparacion'])
  }

}
