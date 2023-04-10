import { Component, OnInit, Inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-cambiar-estado-sintoma',
  templateUrl: './cambiar-estado-sintoma.component.html',
  styleUrls: ['./cambiar-estado-sintoma.component.scss']
})
export class CambiarEstadoSintomaComponent {

  formularioReparacion !: FormGroup;
  opcionesEstado = new Map([
    [101, 'EN TRANSITO'],
    [202, 'SIN REPARAR'],
    [303, 'REPARACION EN CURSO'],
    [404, 'REPARADO'],
    [505, 'ENVIADO']
  ]);
  @Output() formClosed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoSintomaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id_Reparacion: number,
      id_Reparacion_Estado: number
    }
  ) { }

  ngOnInit(): void {
    this.formularioReparacion = this.formBuilder.group({
      estado: ['', Validators.required]
    });
  }

  submitFormularioReparacion(): void {

    if (this.formularioReparacion.valid) {

      var id_Reparacion = this.data.id_Reparacion;
      var id_Reparacion_Estado = this.data.id_Reparacion_Estado;
      var estado = this.formularioReparacion.get('estado')?.value;
      var id_Estado = this.buscarClave(estado, this.opcionesEstado);

      this.apiService.postCambiarEstadoSintoma(id_Reparacion, id_Reparacion_Estado, id_Estado)
        .subscribe(() => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog
    }

  }

  buscarClave(valorBuscado: any, objetoMap: any) {
    for (const [clave, valor] of objetoMap) {
      if (valor === valorBuscado) {
        return clave;
      }
    }
    return null;
  }

}
