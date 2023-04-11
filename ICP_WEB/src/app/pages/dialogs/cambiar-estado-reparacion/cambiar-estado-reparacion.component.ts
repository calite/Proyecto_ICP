import { Component, OnInit,Inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-cambiar-estado-reparacion',
  templateUrl: './cambiar-estado-reparacion.component.html',
  styleUrls: ['./cambiar-estado-reparacion.component.scss']
})
export class CambiarEstadoReparacionComponent implements OnInit {

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
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoReparacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id_Reparacion: string }
    ) { }

  ngOnInit(): void {
    this.formularioReparacion = this.formBuilder.group({
      estado: ['', Validators.required]
    });
  }

  submitFormularioReparacion(): void {

    if (this.formularioReparacion.valid) {

      var id_Reparacion = parseInt(this.data.id_Reparacion);
      var estado = this.formularioReparacion.get('estado')?.value;
      var id_Estado_Reparacion = this.buscarClave(estado, this.opcionesEstado);

      console.log(id_Reparacion)
      console.log(id_Estado_Reparacion)

      this.apiService.postCambiarEstadoReparacion(id_Reparacion, id_Estado_Reparacion)
      .subscribe(() => {
        this.formClosed.emit(); //enviamos el aviso para que recarge
      });
      this.dialogRef.close(); //cerramos el dialog
    }

  }

  buscarClave(valorBuscado : any, objetoMap : any) {
    for (const [clave, valor] of objetoMap) {
      if (valor === valorBuscado) {
        return clave;
      }
    }
    return null;
  }
}
