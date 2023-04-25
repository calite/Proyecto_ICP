import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-tipo-telefono',
  templateUrl: './tipo-telefono.component.html',
  styleUrls: ['./tipo-telefono.component.scss']
})
export class TipoTelefonoComponent implements OnInit {

  articulosOpciones: Articulo[];

  formularioAltaReparacion: FormGroup;

  get sintomasFormArray() {
    return this.formularioAltaReparacion.controls.sintomas as FormArray;
  }

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { // se genera el form en el constructor
    this.formularioAltaReparacion = this.formBuilder.group({
      articulos: new FormControl(localStorage.getItem('Id_Articulo'), Validators.required)
    });
  }

  ngOnInit(): void {

    this.cargarArticulos();

  }

  //metodos para cargar datos desde la api
  cargarArticulos() {
    this.apiService.getArticulos()
      .subscribe(articulos => {
        this.articulosOpciones = articulos;
      });
  }

  submitFormularioAltaReparacion() {

    if (this.formularioAltaReparacion.valid) {

      //almacenamos en local
      localStorage.setItem('Id_Articulo', this.formularioAltaReparacion.value.articulos); 

      //siguiente
      this.router.navigate(['./alta-reparacion/sintomas'])

    }
  }
}
