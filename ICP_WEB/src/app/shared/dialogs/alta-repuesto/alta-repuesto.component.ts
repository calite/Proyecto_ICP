import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { ApiService } from '../../../core/services/api.service';
import { Sintoma } from 'src/app/core/interfaces/Sintoma.interface';
import { catchError } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-alta-repuesto',
  templateUrl: './alta-repuesto.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class AltaRepuestoComponent {

  formularioAltaRepuesto!: FormGroup;
  private token: string;
  @Output() formClosed = new EventEmitter();
  private imgEncoded: string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaRepuestoComponent>,
    private toastService: ToastService
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
      // var imagenRepuesto = this.formularioAltaRepuesto.value.imagenRepuesto;
      var cantidadRepuesto = this.formularioAltaRepuesto.value.cantidadRepuesto;
      var descripcionSintoma = this.formularioAltaRepuesto.value.sintoma;
      var imagenRepuesto = this.imgEncoded;

      this.apiService.postAltaRepuesto(descripcionRepuesto, fabricanteRepuesto, pesoRepuesto, altoRepuesto, largoRepuesto, anchoRepuesto, imagenRepuesto, cantidadRepuesto, descripcionSintoma, this.token)
        .pipe(
          catchError(response => {

            if (response.error.retCode === 40) {
              this.toastService.toastGenerator("Error", "No se puede poner un dimensiones o stock negativos", 4)
            }

            throw response
          })
        )
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog

    }

  }


  handleFileSelect(event: any): void {
    const file = event.target.files[0];
    this.encodeImageBase64(file);
  }

  encodeImageBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.toString().split(',')[1];
      this.imgEncoded = base64String;
    };
    reader.readAsDataURL(file);
  }

}
