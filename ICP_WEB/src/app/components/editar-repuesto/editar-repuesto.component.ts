import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { ApiService } from '../../core/services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-repuesto',
  templateUrl: './editar-repuesto.component.html',
  styleUrls: ['./editar-repuesto.component.scss']
})
export class EditarRepuestoComponent implements OnInit {

  formularioEditarRepuesto!: FormGroup;
  private token : string;
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService : ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarRepuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      repuesto : Repuesto
    }
  ) { 
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioEditarRepuesto = this.formBuilder.group({
      descripcionRepuesto: [this.data.repuesto.descripcion_Repuesto, Validators.required],
      fabricanteRepuesto: [this.data.repuesto.fabricante, Validators.required],
      pesoRepuesto: [this.data.repuesto.peso, Validators.required],
      altoRepuesto: [this.data.repuesto.alto, Validators.required],
      largoRepuesto: [this.data.repuesto.largo, Validators.required],
      anchoRepuesto: [this.data.repuesto.ancho, Validators.required],
      imagenRepuesto: [this.data.repuesto.imagen, Validators.required]
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioEditarRepuesto(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola

    if (this.formularioEditarRepuesto.valid) {

      var Id_Repuesto = this.data.repuesto.id_Repuesto;
      var Descripcion_Repuesto = this.formularioEditarRepuesto.get('descripcionRepuesto')?.value;
      var Fabricante = this.formularioEditarRepuesto.get('fabricanteRepuesto')?.value;
      var Peso = this.formularioEditarRepuesto.get('pesoRepuesto')?.value;
      var Alto = this.formularioEditarRepuesto.get('altoRepuesto')?.value;
      var Largo = this.formularioEditarRepuesto.get('largoRepuesto')?.value;
      var Ancho = this.formularioEditarRepuesto.get('anchoRepuesto')?.value;
      var Imagen = this.formularioEditarRepuesto.get('imagenRepuesto')?.value;

      this.apiService.postEditarRepuesto(Id_Repuesto,Descripcion_Repuesto,Fabricante,Peso,Alto,Largo,Ancho,Imagen,this.token)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamo el aviso para que recarge
        });
        this.dialogRef.close(); //cerramos dialog
    }
  }

}
