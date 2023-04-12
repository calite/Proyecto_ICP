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
import { identifierName } from '@angular/compiler';

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

    postAltaUsuario(Usuario : string, Email : string, Id_Perfil : number){
        const url = `${this.apiUrl}usuarios/alta_usuario`;
        const body = {
            Usuario: Usuario,
            Password: Usuario, //por el momento se la password sera la misma que el usuario
            Email: Email,
            Id_Perfil: Id_Perfil,
          };
        return this.http.post(url, body);
    }

    postCambiarEstadoUsuario(IdUsuario : number) {
        const url = `${this.apiUrl}usuarios/baja_usuario`;
        const body = {
            IdUsuario: IdUsuario
          };
        return this.http.post(url, body);
    }

    postEditarUsuario(Id_Usuario : number, nombreUsuario : string, email : string, Id_Perfil : number) {
        const url = `${this.apiUrl}usuarios/editar_usuario`;
        const body = {
            Id_Usuario: Id_Usuario,
            Usuario: nombreUsuario,
            Id_Perfil: Id_Perfil,
            Email: email
          };
        return this.http.post(url, body);
    }

    //REPARACIONES

    getReparaciones(): Observable<Reparacion[]> {
        const url = `${this.apiUrl}reparaciones/detalles`;
        return this.http.get<Reparacion[]>(url);
    }

    getReparacionDetalles(IdReparacion: string) {
        const url = `${this.apiUrl}reparaciones/detalles/${IdReparacion}`;
        return this.http.get<Reparacion>(url);
    }

    getReparacionSintomas(IdReparacion: string) {
        const url = `${this.apiUrl}reparaciones/sintomas/${IdReparacion}`;
        return this.http.get<ReparacionSintoma[]>(url);
        
    }

    getEnvio(IdReparacion: number) {
        const url = `${this.apiUrl}reparaciones/envio/${IdReparacion}`;
        return this.http.get<Envio>(url);
    }

    getRecogida(IdReparacion: number) {
        const url = `${this.apiUrl}reparaciones/recogida/${IdReparacion}`;
        return this.http.get<Recogida>(url);
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

        return this.http.post(url, body);
    }

    //ARTICULOS

    getArticulos() {
        const url = `${this.apiUrl}articulos/all`;
        return this.http.get<Articulo[]>(url);
    }
    
    postCambiarEstadoArticulo(IdArticulo : number) {
        const url = `${this.apiUrl}articulos/baja_articulo`;
        const body = {
            IdArticulo: IdArticulo
          };
        return this.http.post(url, body);
    }
    
    postEditarArticulo(Id_Articulo : number, marca : string, modelo : string) {
        const url = `${this.apiUrl}articulos/editar_articulo`;
        const body = {
            id_Articulo : Id_Articulo,
            marca : marca,
            Modelo : modelo,
          };
        return this.http.post(url, body);
    }
    
    postAltaArticulo(marca : string, modelo : string) {
        const url = `${this.apiUrl}articulos/alta_articulo`;
        const body = {
            marca : marca,
            Modelo : modelo,
          };
        return this.http.post(url, body);
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

    postEditarRepuesto(Id_Repuesto : number, Descripcion_Repuesto : string, Fabricante : string, Peso : number, Alto : number, Largo : number, Ancho : number, Imagen : string) {
        const url = `${this.apiUrl}repuestos/editar_repuesto`;
        const body = {
            Id_Repuesto : Id_Repuesto,
            Descripcion_Repuesto : Descripcion_Repuesto,
            Fabricante : Fabricante,
            Peso : Peso,
            Alto : Alto,
            Largo : Largo,
            Ancho : Ancho,
            Imagen : Imagen
          };
        return this.http.post(url, body);
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