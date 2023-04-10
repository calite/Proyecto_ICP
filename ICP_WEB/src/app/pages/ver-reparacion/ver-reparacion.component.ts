import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Reparaciones } from 'src/app/core/interfaces/Reparaciones.interface';
import { ApiService } from '../../core/api.service';
import { ReparacionSintomas } from 'src/app/core/interfaces/ReparacionSintomas.interface';
import { Recogida } from 'src/app/core/interfaces/Recogida.interface';
import { Envio } from 'src/app/core/interfaces/Envio.interface';
import { MatDialog } from '@angular/material/dialog';
import { CambiarEstadoReparacionComponent } from '../dialogs/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from '../dialogs/cambiar-estado-sintoma/cambiar-estado-sintoma.component';

@Component({
  selector: 'app-ver-reparacion',
  templateUrl: './ver-reparacion.component.html',
  styleUrls: ['./ver-reparacion.component.scss']
})
export class VerReparacionComponent {

  reparacion !: Reparaciones;
  sintomas !: ReparacionSintomas[];
  recogida !: Recogida;
  envio !: Envio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cambiarEstadoReparacionDialog: MatDialog
  ) {

  }

  ngOnInit(): void {

    this.cargarDatosReparacion();

    this.cargarDatosEnviosRecogidas();

  }

  cargarDatosReparacion() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getReparacionDetalles(id_Reparacion)) //operadores rx
      )
      .subscribe(reparacion => {
        this.reparacion = reparacion[0];
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getReparacionSintomas(id_Reparacion)),
      )
      .subscribe(sintomas => {
        this.sintomas = sintomas;
        console.log(sintomas)
      });

  }

  cargarDatosEnviosRecogidas() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getRecogida(id_Reparacion)),
      )
      .subscribe(recogida => {
        this.recogida = recogida[0];
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getEnvio(id_Reparacion)),
      )
      .subscribe(envio => {
        this.envio = envio[0];
      });
  }

  cambiarEstadoReparacion(id_Reparacion: number) {
    const dialogRef = this.cambiarEstadoReparacionDialog.open(CambiarEstadoReparacionComponent, {
      data: { id_Reparacion: id_Reparacion }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => {
      this.cargarDatosReparacion();
    });
  }

  cambiarEstadoSintoma(id_Reparacion : number, id_Reparacion_Estado: number) {
    const dialogRef = this.cambiarEstadoReparacionDialog.open(CambiarEstadoSintomaComponent, {
      data: { id_Reparacion: id_Reparacion, id_Reparacion_Estado: id_Reparacion_Estado }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => {
      this.cargarDatosReparacion();
    });
  }

}
