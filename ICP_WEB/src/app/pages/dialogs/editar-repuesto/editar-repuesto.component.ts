import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Repuestos } from 'src/app/core/interfaces/Repuestos.interface';
import { ApiService } from '../../../core/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-repuesto',
  templateUrl: './editar-repuesto.component.html',
  styleUrls: ['./editar-repuesto.component.scss']
})
export class EditarRepuestoComponent {

  formularioEditarRepuesto!: FormGroup;
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService : ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarRepuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      repuesto : Repuestos
    }
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioEditarRepuesto = this.formBuilder.group({
      descripcionRepuesto: [this.data.repuesto.descripcion_Repuesto, Validators.required],
      fabricanteRepuesto: [this.data.repuesto.fabricante, Validators.required],
      pesoRepuesto: [this.data.repuesto.peso, Validators.required],
      altoRepuesto: [this.data.repuesto.alto, Validators.required],
      largoRepuesto: [this.data.repuesto.largo, Validators.required],
      anchoRepuesto: [this.data.repuesto.ancho, Validators.required],
      imagenRepuesto: [this.data.repuesto.imagen, Validators.required],
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioEditarRepuesto(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola

    if (this.formularioEditarRepuesto.valid) {
      console.log('ey');
    }
  }

}
