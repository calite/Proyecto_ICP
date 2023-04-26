import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Reparacion } from 'src/app/core/interfaces/Reparacion.interface';
import { ApiService } from '../../../core/services/api.service';
import { ReparacionSintoma } from 'src/app/core/interfaces/ReparacionSintoma.interface';
import { Recogida } from 'src/app/core/interfaces/Recogida.interface';
import { Envio } from 'src/app/core/interfaces/Envio.interface';
import { MatDialog } from '@angular/material/dialog';
import { CambiarEstadoReparacionComponent } from '../../../shared/dialogs/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from '../../../shared/dialogs/cambiar-estado-sintoma/cambiar-estado-sintoma.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-ver-reparacion',
  templateUrl: './ver-reparacion.component.html',
  styleUrls: ['./ver-reparacion.component.scss']
})
export class VerReparacionComponent implements OnInit {

  reparacion !: Reparacion;
  sintomas !: ReparacionSintoma[];
  recogida !: Recogida;
  envio !: Envio;
  private token : string;
  private datosUsuario;


  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cambiarEstadoReparacionDialog: MatDialog,
    private toastService : ToastService
  ) {
    this.token = sessionStorage.getItem('token');
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
  }

  ngOnInit(): void {

    this.cargarDatosReparacion();
    this.cargarDatosEnviosRecogidas();

  }

  perfilActual(){
    return this.datosUsuario['id_Perfil'];
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
      }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarDatosReparacion();
      this.toastService.toastGenerator("Aviso", "Estado cambiado correctamente", 2)
    });
  }

  cambiarEstadoSintoma(id_Reparacion_Sintoma_Estado: number,id_Reparacion : number) {
    const dialogRef = this.cambiarEstadoReparacionDialog.open(CambiarEstadoSintomaComponent, {
      data: { id_Reparacion_Sintoma_Estado: id_Reparacion_Sintoma_Estado, id_Reparacion: id_Reparacion }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarDatosReparacion();
      this.toastService.toastGenerator("Aviso", "Estado cambiado correctamente", 2)
    });
  }

}
