import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Reparaciones } from './interfaces/Reparaciones.interface';
import { ReparacionSintomas } from './interfaces/ReparacionSintomas.interface';
import { RepuestosStock } from './interfaces/RepuestosStock.interface';
import { Repuestos } from './interfaces/Repuestos.interface';
import { UsuariosPerfiles } from './interfaces/UsuariosPerfiles.interface';
import { Articulos } from './interfaces/Articulos.interface';
import { Envio } from './interfaces/Envio.interface';
import { Recogida } from './interfaces/Recogida.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    private apiUrl: string = 'https://localhost:7198/api/';



    constructor(private http: HttpClient) { }
   
    //USUARIOS

    getUsuariosPerfiles() {
        const url = `${this.apiUrl}usuarios/detalles`;
        return this.http.get<UsuariosPerfiles[]>(url);
    }

    //REPARACIONES

    getReparaciones(): Observable<Reparaciones[]> {
        const url = `${this.apiUrl}reparaciones/detalles`;
        return this.http.get<Reparaciones[]>(url);
    }

    getReparacionDetalles(id_Reparacion: string) {
        const url = `${this.apiUrl}reparaciones/detalles/${id_Reparacion}`;
        return this.http.get<Reparaciones[]>(url);
    }

    getReparacionSintomas(id_Reparacion: string) {
        const url = `${this.apiUrl}reparaciones/sintomas/${id_Reparacion}`;
        return this.http.get<ReparacionSintomas[]>(url);
        
    }

    getEnvio(id_Reparacion: number) {
        const url = `${this.apiUrl}reparaciones/envio/${id_Reparacion}`;
        return this.http.get<Envio[]>(url);
    }

    getRecogida(id_Reparacion: number) {
        const url = `${this.apiUrl}reparaciones/recogida/${id_Reparacion}`;
        return this.http.get<Recogida[]>(url);
    }

    postCambiarEstadoReparacion(IdReparacion: number, IdEstado: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}reparaciones/cambiar_estado_reparacion`;
        const body = {
            IdReparacion: IdReparacion,
            IdEstado: IdEstado
          };
        return this.http.post(url, body);
    }

    postCambiarEstadoSintoma(IdReparacion: number,IdReparacionEstado: number, IdEstado: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}reparaciones/cambiar_estado_sintoma`;
        const body = {
            IdReparacion : IdReparacion,
            IdReparacionEstado: IdReparacionEstado,
            IdEstado: IdEstado
          };
        return this.http.post(url, body);
    }

    //ARTICULOS

    getArticulos() {
        const url = `${this.apiUrl}articulos/all`;
        return this.http.get<Articulos[]>(url);
    }

    //REPUESTOS

    getRepuestos() {
        const url = `${this.apiUrl}repuestos/all`;
        return this.http.get<Repuestos[]>(url);
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
            cantidad : Cantidad
          };
        return this.http.post(url, body);
    }

    //STOCKS

    getRepuestosStock() {
        const url = `${this.apiUrl}repuestos/stock`;
        return this.http.get<RepuestosStock[]>(url);
    }

    postCambiarStockRepuesto(IdRepuesto: number, Cantidad: number) { //post, por lo tango los parametros se tienen que llamar igual
        const url = `${this.apiUrl}repuestos/cambiar_stocks`;
        const body = {
            IdRepuesto: IdRepuesto,
            Cantidad: Cantidad,
          };
        return this.http.post(url, body);
    }

}