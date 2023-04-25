import { Component, OnInit,Inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { EstadoReparacion } from '../../core/interfaces/EstadoReparacion.interface';

@Component({
  selector: 'app-cambiar-estado-reparacion',
  templateUrl: './cambiar-estado-reparacion.component.html',
  styleUrls: ['./cambiar-estado-reparacion.component.scss']
})
export class CambiarEstadoReparacionComponent implements OnInit {

  formularioReparacion !: FormGroup;
  opcionesEstado : EstadoReparacion[];
  @Output() formClosed = new EventEmitter();
  private token : string;

  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoReparacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id_Reparacion: string }
    ) {
      this.token = sessionStorage.getItem('token');

      this.formularioReparacion = this.formBuilder.group({
        estado: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados() {
    this.apiService.getEstadosReparacion()
      .subscribe(estados => {
        this.opcionesEstado = estados;
      });
  }

  submitFormularioReparacion(): void {

    if (this.formularioReparacion.valid) {

      var id_Reparacion = parseInt(this.data.id_Reparacion);
      var id_Estado_Reparacion = this.formularioReparacion.get('estado')?.value;

      this.apiService.postCambiarEstadoReparacion(id_Reparacion, id_Estado_Reparacion, this.token)
      .subscribe(() => {
        this.formClosed.emit(); //enviamos el aviso para que recarge
      });
      this.dialogRef.close(); //cerramos el dialog
    }

  }

}
