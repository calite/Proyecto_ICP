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
    [11, 'SIN REPARAR'],
    [22, 'REPARACION EN CURSO'],
    [33, 'REPARADO'],
    [44, 'IMPOSIBLE REPARAR']
  ]);
  @Output() formClosed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoSintomaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id_Reparacion: number,
      id_Reparacion_Sintoma_Estado: number
    }
  ) { }

  ngOnInit(): void {
    this.formularioReparacion = this.formBuilder.group({
      estado: ['', Validators.required]
    });
  }

  submitFormularioReparacion(): void {

    if (this.formularioReparacion.valid) {

      var IdReparacionSintomaEstado = this.data.id_Reparacion_Sintoma_Estado;
      var IdReparacion = this.data.id_Reparacion;
      var estado = this.formularioReparacion.get('estado')?.value;
      var IdEstadoSintoma = this.buscarClave(estado, this.opcionesEstado);

      console.log('dialog')
      console.log('RSE ' + IdReparacionSintomaEstado)
      console.log('R ' + IdReparacion)
      console.log('ES ' + IdEstadoSintoma)

      this.apiService.postCambiarEstadoSintoma(IdReparacionSintomaEstado, IdReparacion, IdEstadoSintoma)
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
