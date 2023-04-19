import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Reparacion } from 'src/app/core/interfaces/Reparacion.interface';
import { ApiService } from '../../core/api.service';
import { ReparacionSintoma } from 'src/app/core/interfaces/ReparacionSintoma.interface';
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

  reparacion !: Reparacion;
  sintomas !: ReparacionSintoma[];
  recogida !: Recogida;
  envio !: Envio;
  private token : string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cambiarEstadoReparacionDialog: MatDialog
  ) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit(): void {

    this.cargarDatosReparacion();
    this.cargarDatosEnviosRecogidas();

  }

  cargarDatosReparacion() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getReparacionDetalles(id_Reparacion, this.token)) //operadores rx
      )
      .subscribe(reparacion => {
        this.reparacion = reparacion;      
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getReparacionSintomas(id_Reparacion, this.token)),
      )
      .subscribe(sintomas => {
        this.sintomas = sintomas;
      });

  }

  cargarDatosEnviosRecogidas() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getRecogida(id_Reparacion, this.token))
      )
      .subscribe(recogida => {
        this.recogida = recogida;
        
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id_Reparacion }) => this.apiService.getEnvio(id_Reparacion, this.token)),
      )
      .subscribe(envio => {
        this.envio = envio;
      });
  }

  cambiarEstadoReparacion(id_Reparacion: number) {
    
    const dialogRef = this.cambiarEstadoReparacionDialog.open(CambiarEstadoReparacionComponent, {
      data: { 
        id_Reparacion: id_Reparacion,
        //id_Estado  : id_Estado
      }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarDatosReparacion();
    });
  }

  cambiarEstadoSintoma(id_Reparacion_Sintoma_Estado: number,id_Reparacion : number) {
    const dialogRef = this.cambiarEstadoReparacionDialog.open(CambiarEstadoSintomaComponent, {
      data: { id_Reparacion_Sintoma_Estado: id_Reparacion_Sintoma_Estado, id_Reparacion: id_Reparacion }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarDatosReparacion();
    });
  }

}
