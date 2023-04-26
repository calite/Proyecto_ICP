import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { ApiService } from '../../../core/services/api.service';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';

@Component({
  selector: 'app-alta-repuesto',
  templateUrl: './alta-repuesto.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class AltaRepuestoComponent {

  formularioAltaRepuesto!: FormGroup;
  private token : string;
  @Output() formClosed = new EventEmitter();


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaRepuestoComponent>
  ) { 

    this.token = sessionStorage.getItem('token');

    this.formularioAltaRepuesto = this.formBuilder.group({
      descripcionRepuesto: ['', Validators.required],
      fabricanteRepuesto: ['', Validators.required],
      pesoRepuesto: ['', Validators.required],
      altoRepuesto: ['', Validators.required],
      largoRepuesto: ['', Validators.required],
      anchoRepuesto: ['', Validators.required],
      imagenRepuesto: ['', Validators.required],
      cantidadRepuesto: ['', Validators.required],
      sintoma: ['', Validators.required]
    });

  }

  // Método que se llama al enviar el formulario
  submitFormularioAltaRepuesto(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola

    

    if (this.formularioAltaRepuesto.valid) {

      var descripcionRepuesto = this.formularioAltaRepuesto.value.descripcionRepuesto;
      var fabricanteRepuesto = this.formularioAltaRepuesto.value.fabricanteRepuesto;
      var pesoRepuesto = this.formularioAltaRepuesto.value.pesoRepuesto;
      var altoRepuesto = this.formularioAltaRepuesto.value.altoRepuesto;
      var largoRepuesto = this.formularioAltaRepuesto.value.largoRepuesto;
      var anchoRepuesto = this.formularioAltaRepuesto.value.anchoRepuesto;
      var imagenRepuesto = this.formularioAltaRepuesto.value.imagenRepuesto;
      var cantidadRepuesto = this.formularioAltaRepuesto.value.cantidadRepuesto;
      var descripcionSintoma = this.formularioAltaRepuesto.value.sintoma;

      this.apiService.postAltaRepuesto(descripcionRepuesto, fabricanteRepuesto, pesoRepuesto, altoRepuesto, largoRepuesto, anchoRepuesto, imagenRepuesto, cantidadRepuesto, descripcionSintoma, this.token)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog

    }
  }

}
