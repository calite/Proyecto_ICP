import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent {

  formularioAltaReparacion!: FormGroup;
  grupoSintomas !: FormGroup;

  sintomas !: Sintoma[];
  articulos !: Articulo[];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {



  }



  ngOnInit(): void {

    this.cargarArticulos();
    this.cargarSintomas();

    this.formularioAltaReparacion = this.formBuilder.group({
      articulos: new FormControl('', Validators.required),
      sintomas: [this.sintomas, Validators.required],
      recogida: this.formBuilder.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        poblacion: ['', Validators.required],
        provincia: ['', Validators.required],
        codigo_postal: ['', Validators.required],
        persona_contacto: ['', Validators.required],
        telefono: ['', Validators.required]
      }),
      envio: this.formBuilder.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        poblacion: ['', Validators.required],
        provincia: ['', Validators.required],
        codigo_postal: ['', Validators.required],
        persona_contacto: ['', Validators.required],
        telefono: ['', Validators.required]
      })
    });

  }

  submitFormularioAltaReparacion() {
    
   console.log(this.formularioAltaReparacion.get('sintomas')?.get('20'))

  }

  cargarArticulos() {
    this.apiService.getArticulos()
      .subscribe(articulos => {
        this.articulos = articulos;
      });
  }


  cargarSintomas() {
    this.apiService.getSintomas()
      .subscribe(sintomas => {
        this.sintomas = sintomas;
      });
  }

}

