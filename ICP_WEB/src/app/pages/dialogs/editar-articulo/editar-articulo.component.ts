import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.scss']
})
export class EditarArticuloComponent {

  formularioEditarArticulo!: FormGroup;

  pepito : boolean = false;

  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService : ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      articulo : Articulo
    }
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioEditarArticulo = this.formBuilder.group({
      marcaArticulo: [this.data.articulo.marca, Validators.required],
      modeloArticulo: [this.data.articulo.modelo, Validators.required],
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioEditarArticulo(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola

    if (this.formularioEditarArticulo.valid) {
      var Id_Articulo = this.data.articulo.id_Articulo;
      var Marca = this.formularioEditarArticulo.get('marcaArticulo')?.value;
      var Modelo = this.formularioEditarArticulo.get('modeloArticulo')?.value;

      this.apiService.postEditarArticulo(Id_Articulo,Marca,Modelo)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamo el aviso para que recarge
        });
        this.dialogRef.close(); //cerramos dialog
    }
  }

}
