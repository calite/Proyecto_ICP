import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent {

  formularioAltaReparacion!: FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ){}

  ngOnInit() : void {
    this.formularioAltaReparacion = this.formBuilder.group({

    });
  }


  submitFormularioAltaReparacion() {
    console.log('ey')
  }

}
