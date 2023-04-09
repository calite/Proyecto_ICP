import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Reparaciones } from 'src/app/core/interfaces/Reparaciones.interface';
import { ApiService } from '../../core/api.service';
import { ReparacionSintomas } from 'src/app/core/interfaces/ReparacionSintomas.interface';
import { Recogida } from 'src/app/core/interfaces/Recogida.interface';
import { Envio } from 'src/app/core/interfaces/Envio.interface';

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
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({ id_Reparacion }) => this.apiService.getReparacionDetalles(id_Reparacion) ), //operadores rx
      tap( console.log ) //forma corta de impresion en consola
    )
    .subscribe(reparacion => {
      this.reparacion = reparacion[0];
    });

    this.activatedRoute.params
    .pipe(
      switchMap(({ id_Reparacion }) => this.apiService.getReparacionSintomas(id_Reparacion) ),
    )
    .subscribe(sintomas => {
      this.sintomas = sintomas;
      console.log(sintomas)
    });

    this.activatedRoute.params
    .pipe(
      switchMap(({ id_Reparacion }) => this.apiService.getRecogida(id_Reparacion) ),
    )
    .subscribe(recogida => {
      this.recogida = recogida[0];
      console.log(recogida)
    });

    this.activatedRoute.params
    .pipe(
      switchMap(({ id_Reparacion }) => this.apiService.getEnvio(id_Reparacion) ),
    )
    .subscribe(envio => {
      this.envio = envio[0];
      console.log(envio)
    });

  }

  cambiarEstadoReparacion(id_Reparacion : number) {
    this.apiService.postCambiarEstadoReparacion(6, 101)
      .subscribe( resultado => {
        console.log(resultado)
      });
  }

  cambiarEstadoSintoma(id_Reparacion_Sintoma : number) {

  }

}
