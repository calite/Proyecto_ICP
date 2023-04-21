import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-alta-articulo',
  templateUrl: './alta-articulo.component.html',
  styleUrls: ['./alta-articulo.component.scss']
})
export class AltaArticuloComponent {

  formularioAltaArticulo!: FormGroup;
  private token : string;
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaArticuloComponent>
  ) {
    this.token = sessionStorage.getItem('token');
   }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioAltaArticulo = this.formBuilder.group({
      marcaArticulo: ['', Validators.required],
      modeloArticulo: ['', Validators.required],
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioAltaArticulo(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola

    if (this.formularioAltaArticulo.valid) {

      var Marca = this.formularioAltaArticulo.get('marcaArticulo')?.value;
      var Modelo = this.formularioAltaArticulo.get('modeloArticulo')?.value;

      this.apiService.postAltaArticulo(Marca, Modelo, this.token)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog

    }
  }

}
