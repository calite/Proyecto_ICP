import { Component, OnInit, Inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { EstadoReparacion } from '../../../core/interfaces/EstadoReparacion.interface';

@Component({
  selector: 'app-cambiar-estado-reparacion',
  templateUrl: './cambiar-estado-reparacion.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class CambiarEstadoReparacionComponent implements OnInit {

  formularioReparacion !: FormGroup;
  opcionesEstado: EstadoReparacion[];
  @Output() formClosed = new EventEmitter();
  private token: string;
  public puedeEnviarse : boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoReparacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id_Reparacion: string, puedeEnviarse: boolean }
  ) {
    this.token = sessionStorage.getItem('token');
    this.puedeEnviarse = this.data.puedeEnviarse
    this.formularioReparacion = this.formBuilder.group({
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEstados();
    console.log(this.puedeEnviarse)
  }

  cargarEstados() {
    this.apiService.getEstadosReparacion()
      .subscribe(estados => {
        this.opcionesEstado = estados//.filter(x => x.habilitado == true);
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
