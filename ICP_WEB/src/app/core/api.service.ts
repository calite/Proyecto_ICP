import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Reparacion } from './interfaces/Reparacion.interface';
import { RepuestoStock } from './interfaces/RepuestoStock.interface';
import { Repuesto } from './interfaces/Repuesto.interface';
import { UsuarioPerfil } from './interfaces/UsuarioPerfil.interface';
import { Articulo } from './interfaces/Articulo.interface';
import { Envio } from './interfaces/Envio.interface';
import { Recogida } from './interfaces/Recogida.interface';
import { ReparacionSintoma } from './interfaces/ReparacionSintoma.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    private apiUrl: string = 'https://localhost:7198/api/';



    constructor(private http: HttpClient) { }
   
    //USUARIOS

    getUsuariosPerfiles() {
        const url = `${this.apiUrl}usuarios/detalles`;
        return this.http.get<UsuarioPerfil[]>(url);
    }

    //REPARACIONES

    getReparaciones(): Observable<Reparacion[]> {
        const url = `${this.apiUrl}reparaciones/detalles`;
        return this.http.get<Reparacion[]>(url);
    }

    getReparacionDetalles(IdReparacion: string) {
        const url = `${this.apiUrl}reparaciones/detalles/${IdReparacion}`;
        return this.http.get<Reparacion[]>(url);
    }

    getReparacionSintomas(IdReparacion: string) {
        const url = `${this.apiUrl}reparaciones/sintomas/${IdReparacion}`;
        return this.http.get<ReparacionSintoma[]>(url);
        
    }

    getEnvio(IdReparacion: number) {
        const url = `${this.apiUrl}reparaciones/envio/${IdReparacion}`;
        return this.http.get<Envio[]>(url);
    }

    getRecogida(IdReparacion: number) {
        const url = `${this.apiUrl}reparaciones/recogida/${IdReparacion}`;
        return this.http.get<Recogida[]>(url);
    }

    postCambiarEstadoReparacion(IdReparacion: number, IdEstadoReparacion: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}reparaciones/cambiar_estado_reparacion`;
        const body = {
            IdReparacion: IdReparacion,
            IdEstadoReparacion: IdEstadoReparacion
          };

        return this.http.post(url, body);
    }

    postCambiarEstadoSintoma(IdReparacionSintomaEstado: number,IdReparacion: number, IdEstadoSintoma: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}reparaciones/cambiar_estado_sintoma`;
        const body = {
            IdReparacionSintomaEstado: IdReparacionSintomaEstado,
            IdReparacion : IdReparacion,
            IdEstadoSintoma: IdEstadoSintoma
          };
          /*
          console.log('API - service')
          console.log('RSE ' + IdReparacionSintomaEstado)
          console.log('R ' + IdReparacion)
          console.log('ES ' + IdEstadoSintoma)
          */
        return this.http.post(url, body);
    }

    //ARTICULOS

    getArticulos() {
        const url = `${this.apiUrl}articulos/all`;
        return this.http.get<Articulo[]>(url);
    }

    //REPUESTOS

    getRepuestos() {
        const url = `${this.apiUrl}repuestos/all`;
        return this.http.get<Repuesto[]>(url);
    }


    postCambiarEstadoRepuesto(IdRepuesto : number) {
        const url = `${this.apiUrl}repuestos/baja_repuesto`;
        const body = {
            IdRepuesto: IdRepuesto
          };
        return this.http.post(url, body);
    }

    postEditarRepuesto() {

    }

    postAltaRepuesto(Descripcion_Repuesto : string, Fabricante : string, Peso : number, Alto : number, Largo : number, Ancho : number, Imagen : string, Cantidad : number) {
        const url = `${this.apiUrl}repuestos/alta_repuesto`;
        const body = {
            Descripcion_Repuesto : Descripcion_Repuesto,
            Fabricante : Fabricante,
            Peso : Peso,
            Alto : Alto,
            Largo : Largo,
            Ancho : Ancho,
            Imagen : Imagen,
            Cantidad : Cantidad
          };
        return this.http.post(url, body);
    }

    //STOCKS

    getRepuestosStock() {
        const url = `${this.apiUrl}repuestos/stock`;
        return this.http.get<RepuestoStock[]>(url);
        
    }

    postCambiarStockRepuesto(Id_Repuesto: number, Cantidad: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}repuestos/cambiar_stocks`;
        const body = {
            IdRepuesto: Id_Repuesto,
            Cantidad: Cantidad,
          };
        return this.http.post(url, body);
    }

}