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

    getRepuestos() {
        const url = `${this.apiUrl}repuestos/all`;
        return this.http.get<Repuestos[]>(url);
    }

    getRepuestosStock() {
        const url = `${this.apiUrl}repuestos/stock`;
        return this.http.get<RepuestosStock[]>(url);
    }

    getUsuariosPerfiles() {
        const url = `${this.apiUrl}usuarios/detalles`;
        return this.http.get<UsuariosPerfiles[]>(url);
    }

    getArticulos() {
        const url = `${this.apiUrl}articulos/all`;
        return this.http.get<Articulos[]>(url);
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
            IdReparacion,
            IdReparacionEstado: IdReparacionEstado,
            IdEstado: IdEstado
          };
        return this.http.post(url, body);
    }

}