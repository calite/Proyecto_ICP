import { Component, OnInit, Inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { EstadoSintoma } from '../../../core/interfaces/EstadoSintoma.interface';

@Component({
  selector: 'app-cambiar-estado-sintoma',
  templateUrl: './cambiar-estado-sintoma.component.html',
  styleUrls: ['./cambiar-estado-sintoma.component.scss']
})
export class CambiarEstadoSintomaComponent {

  formularioReparacion !: FormGroup;
  opcionesEstado : EstadoSintoma[];
  @Output() formClosed = new EventEmitter();
  private token : string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarEstadoSintomaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id_Reparacion: number,
      id_Reparacion_Sintoma_Estado: number
    }
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
    this.apiService.getEstadosSintomas()
      .subscribe(estados => {
        this.opcionesEstado = estados;
      });
  }

  submitFormularioReparacion(): void {

    if (this.formularioReparacion.valid) {

      var IdReparacionSintomaEstado = this.data.id_Reparacion_Sintoma_Estado;
      var IdReparacion = this.data.id_Reparacion;
      var estado = this.formularioReparacion.get('estado')?.value;
      var IdEstadoSintoma = this.buscarClave(estado, this.opcionesEstado);

      this.apiService.postCambiarEstadoSintoma(IdReparacionSintomaEstado, IdReparacion, IdEstadoSintoma, this.token)
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
