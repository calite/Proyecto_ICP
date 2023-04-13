import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup, FormArray, FormControl, ValidatorFn, Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent {

  articulosOpciones: Articulo[];
  sintomasOpciones: Sintoma[];

  formularioAltaReparacion: FormGroup;


  get sintomasFormArray() {
    return this.formularioAltaReparacion.controls.sintomas as FormArray;
  }

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { // se genera el form en el constructor
    this.formularioAltaReparacion = this.formBuilder.group({
      articulos: new FormControl('', Validators.required),
      sintomas: new FormArray([], this.comprobarSintomas(1)),
      //temp
      recogida_calle: ['c/º pepito', Validators.required],
      recogida_numero: ['21', Validators.required],
      recogida_poblacion: ['pepito pob', Validators.required],
      recogida_provincia: ['pepito prov', Validators.required],
      recogida_codigo_postal: ['20091', Validators.required],
      recogida_persona_contacto: ['pepito ?', Validators.required],
      recogida_telefono: ['22222', Validators.required],
      envio_calle: ['c/º pepito', Validators.required],
      envio_numero: ['21', Validators.required],
      envio_poblacion: ['pepito pob', Validators.required],
      envio_provincia: ['pepito prov', Validators.required],
      envio_codigo_postal: ['20091', Validators.required],
      envio_persona_contacto: ['pepito ?', Validators.required],
      envio_telefono: ['22222', Validators.required]
    });

  }


  ngOnInit(): void {

    this.cargarArticulos();
    this.cargarSintomas();

  }



  private addCheckboxes() { //metdo para añadir los checkboxes al FormArray del formulario
    this.sintomasOpciones.forEach(() => this.sintomasFormArray.push(new FormControl(false)));
  }

  //metodos para cargar datos desde la api
  cargarArticulos() {
    this.apiService.getArticulos()
      .subscribe(articulos => {
        this.articulosOpciones = articulos;
      });
  }

  private cargarSintomas() {
    this.apiService.getSintomas()
      .subscribe(sintomas => {
        this.sintomasOpciones = sintomas;
        this.addCheckboxes();
      });
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

    const sintomasSeleccionados = this.formularioAltaReparacion.value.sintomas
      .map((checked, i) => checked ? this.sintomasOpciones[i].id_Sintoma : null)
      .filter(v => v !== null);

    const repuestosNecesarios = this.formularioAltaReparacion.value.sintomas
      .map((checked, i) => checked ? this.sintomasOpciones[i].id_Repuesto : null)
      .filter(v => v !== null);

    var json = {};

    json['Id_Articulo'] = this.formularioAltaReparacion.value.articulos;

    json['Recogida_Calle'] = this.formularioAltaReparacion.controls.recogida_calle.value;
    json['Recogida_Numero'] = this.formularioAltaReparacion.controls.recogida_numero.value;
    json['Recogida_Poblacion'] = this.formularioAltaReparacion.controls.recogida_poblacion.value;
    json['Recogida_Provincia'] = this.formularioAltaReparacion.controls.recogida_provincia.value;
    json['Recogida_Codigo_Postal'] = this.formularioAltaReparacion.controls.recogida_codigo_postal.value;
    json['Recogida_Persona_Contacto'] = this.formularioAltaReparacion.controls.recogida_persona_contacto.value;
    json['Recogida_Telefono'] = this.formularioAltaReparacion.controls.recogida_telefono.value;

    json['Envio_Calle'] = this.formularioAltaReparacion.controls.envio_calle.value;
    json['Envio_Numero'] = this.formularioAltaReparacion.controls.envio_numero.value;
    json['Envio_Poblacion'] = this.formularioAltaReparacion.controls.envio_poblacion.value;
    json['Envio_Provincia'] = this.formularioAltaReparacion.controls.envio_provincia.value;
    json['Envio_Codigo_Postal'] = this.formularioAltaReparacion.controls.envio_codigo_postal.value;
    json['Envio_Persona_Contacto'] = this.formularioAltaReparacion.controls.envio_persona_contacto.value;
    json['Envio_Telefono'] = this.formularioAltaReparacion.controls.envio_telefono.value;

    json['Sintomas']  = sintomasSeleccionados;
    json['Repuestos'] = repuestosNecesarios;

    this.apiService.postAltaReparacion(json).subscribe(x => {
      console.log(x);
    });

  }

}

