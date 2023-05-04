import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Reparacion } from '../interfaces/Reparacion.interface';
import { RepuestoStock } from '../interfaces/RepuestoStock.interface';
import { Repuesto } from '../interfaces/Repuesto.interface';
import { UsuarioPerfil } from '../interfaces/UsuarioPerfil.interface';
import { Articulo } from '../interfaces/Articulo.interface';
import { Envio } from '../interfaces/Envio.interface';
import { Recogida } from '../interfaces/Recogida.interface';
import { ReparacionSintoma } from '../interfaces/ReparacionSintoma.interface';
import { Sintoma } from '../interfaces/Sintoma.interface';
import { Perfil } from '../interfaces/Perfil.interface';
import { EstadoSintoma } from '../interfaces/EstadoSintoma.interface';
import { EstadoReparacion } from '../interfaces/EstadoReparacion.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://localhost:7198/api/';


    constructor(private http: HttpClient) { }


    // LOGIN

    // postLogin(Usuario: string, Password: string) {
    //     const url = `${this.apiUrl}usuarios/login`;
    //     const body = {
    //         Usuario: Usuario,
    //         Password: Password
    //     }
    //     return this.http.post(url, body);
    // }


    //USUARIOS

    getUsuarioPorPerfil( token : string){

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/perfiles`;
        return this.http.get<Perfil[]>(url, httpOptions);
    }

    getPerfiles( token : string){

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/perfiles`;
        return this.http.get<Perfil[]>(url, httpOptions);
    }

    getUsuariosPerfiles(token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/detalles`;
        return this.http.get<UsuarioPerfil[]>(url, httpOptions);
    }

    postAltaUsuario(Usuario: string, Email: string, Id_Perfil: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/alta_usuario`;
        const body = {
            Usuario: Usuario,
            Password: Usuario, //por el momento se la password sera la misma que el usuario
            Email: Email,
            Id_Perfil: Id_Perfil,
        };
        return this.http.post(url, body, httpOptions);
    }

    postCambiarEstadoUsuario(IdUsuario: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/baja_usuario`;
        const body = {
            Id_Usuario: IdUsuario
        };
        return this.http.post(url, body, httpOptions);
    }

    postEditarUsuario(Id_Usuario: number, nombreUsuario: string, passUsuario: string, email: string, Id_Perfil: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/editar_usuario`;
        const body = {
            Id_Usuario: Id_Usuario,
            Usuario: nombreUsuario,
            Password: passUsuario,
            Id_Perfil: Id_Perfil,
            Email: email
        };
        return this.http.post(url, body, httpOptions);
    }

    //REPARACIONES

    getEstadosReparacion(): Observable<EstadoReparacion[]> {
        const url = `${this.apiUrl}reparaciones/estados_reparacion`;
        return this.http.get<EstadoReparacion[]>(url);
    }

    getEstadosSintomas(): Observable<EstadoSintoma[]> {
        const url = `${this.apiUrl}reparaciones/estados_sintoma`;
        return this.http.get<EstadoSintoma[]>(url);
    }

    getSintomas(): Observable<Sintoma[]> {
        const url = `${this.apiUrl}reparaciones/sintomas`;
        return this.http.get<Sintoma[]>(url);
    }

    getReparaciones(token: string): Observable<Reparacion[]> {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/detalles`;
        return this.http.get<Reparacion[]>(url, httpOptions);
    }

    getReparacionDetalles(IdReparacion: string, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/detalles/${IdReparacion}`;
        return this.http.get<Reparacion>(url, httpOptions);
    }

    getReparacionSintomas(IdReparacion: string, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/sintomas/${IdReparacion}`;
        return this.http.get<ReparacionSintoma[]>(url, httpOptions);

    }

    getEnvio(IdReparacion: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/envio/${IdReparacion}`;
        return this.http.get<Envio>(url, httpOptions);
    }

    getRecogida(IdReparacion: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/recogida/${IdReparacion}`;
        return this.http.get<Recogida>(url, httpOptions);
    }

    postCambiarEstadoReparacion(IdReparacion: number, IdEstadoReparacion: number, token: string) { //post, por lo tango los parametros se tienen que llamar igual

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/cambiar_estado_reparacion`;
        const body = {
            IdReparacion: IdReparacion,
            IdEstadoReparacion: IdEstadoReparacion
        };

        return this.http.post(url, body, httpOptions);
    }

    postCambiarEstadoSintoma(IdReparacionSintomaEstado: number, IdReparacion: number, IdEstadoSintoma: number, token: string) { //post, por lo tango los parametros se tienen que llamar igual

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}reparaciones/cambiar_estado_sintoma`;
        const body = {
            IdReparacionSintomaEstado: IdReparacionSintomaEstado,
            IdReparacion: IdReparacion,
            IdEstadoSintoma: IdEstadoSintoma
        };
        return this.http.post(url, body, httpOptions);
    }

    postAltaReparacion(jsonObject) {
        const url = `${this.apiUrl}reparaciones/alta_reparacion`;
        return this.http.post(url, jsonObject);
    }

    //ARTICULOS

    getArticulos() {
        const url = `${this.apiUrl}articulos/all`;
        return this.http.get<Articulo[]>(url);
    }

    getArticulosVisibles() {
        const url = `${this.apiUrl}articulos/all_visibles`;
        return this.http.get<Articulo[]>(url);
    }


    postCambiarEstadoArticulo(IdArticulo: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}articulos/baja_articulo`;
        const body = {
            IdArticulo: IdArticulo
        };
        return this.http.post(url, body, httpOptions);
    }

    postEditarArticulo(Id_Articulo: number, marca: string, modelo: string, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}articulos/editar_articulo`;
        const body = {
            id_Articulo: Id_Articulo,
            marca: marca,
            Modelo: modelo,
        };
        return this.http.post(url, body, httpOptions);
    }

    postAltaArticulo(marca: string, modelo: string, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}articulos/alta_articulo`;
        const body = {
            marca: marca,
            Modelo: modelo,
        };
        return this.http.post(url, body, httpOptions);
    }

    //REPUESTOS

    getRepuestos(token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/all`;
        return this.http.get<Repuesto[]>(url, httpOptions);
    }


    postCambiarEstadoRepuesto(IdRepuesto: number, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/baja_repuesto`;
        const body = {
            IdRepuesto: IdRepuesto
        };
        return this.http.post(url, body, httpOptions)
    }

    postEditarRepuesto(Id_Repuesto: number, Descripcion_Repuesto: string, Fabricante: string, Peso: number, Alto: number, Largo: number, Ancho: number, Imagen: string, token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/editar_repuesto`;
        const body = {
            Id_Repuesto: Id_Repuesto,
            Descripcion_Repuesto: Descripcion_Repuesto,
            Fabricante: Fabricante,
            Peso: Peso,
            Alto: Alto,
            Largo: Largo,
            Ancho: Ancho,
            Imagen: Imagen
        };

        return this.http.post(url, body, httpOptions);
    }

    postAltaRepuesto(Descripcion_Repuesto: string, Fabricante: string, Peso: number, Alto: number, Largo: number, Ancho: number, Imagen: string, Cantidad: number,Descripcion_Sintoma : string, token : string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/alta_repuesto`;
        const body = {
            Descripcion_Repuesto: Descripcion_Repuesto,
            Fabricante: Fabricante,
            Peso: Peso,
            Alto: Alto,
            Largo: Largo,
            Ancho: Ancho,
            Imagen: Imagen,
            Cantidad: Cantidad,
            Descripcion_Sintoma : Descripcion_Sintoma
        };

        return this.http.post(url, body, httpOptions);
    }

    //STOCKS

    getRepuestosStock(token: string) {

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/stock`;
        return this.http.get<RepuestoStock[]>(url, httpOptions);

    }

    postCambiarStockRepuesto(Id_Repuesto: number, Cantidad: number, token: string) { //post, por lo tango los parametros se tienen que llamar igual

        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}repuestos/cambiar_stocks`;
        const body = {
            IdRepuesto: Id_Repuesto,
            Cantidad: Cantidad,
        };
        return this.http.post(url, body, httpOptions);
    }

}