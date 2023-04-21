import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfil } from '../interfaces/UsuarioPerfil.interface';
import { Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({providedIn: 'root'})
export class AuthService {

    private apiUrl: string = 'https://localhost:7198/api/';
    private usuario ?: UsuarioPerfil;

    constructor(private http: HttpClient, private apiService : ApiService) { }

    get usuarioActual() : UsuarioPerfil | undefined | null {
        if(!this.usuario) return undefined;
        return structuredClone(this.usuario);
    }

    postLogin(Usuario: string, Password: string) {
        const url = `${this.apiUrl}usuarios/login`;
        const body = {
            Usuario: Usuario,
            Password: Password
        }
        return this.http.post(url, body)
            .pipe(
                tap( respuesta => {
                    this.usuario = respuesta['value']
                    console.log(this.usuario)
                    }),
                tap(respuesta => sessionStorage.setItem('token', respuesta['token']['token']))
            );
    }
    
    comprobarAutenticacion() : Observable<boolean> {
        if ( !sessionStorage.getItem('token') ) return of ( false )
        return of ( true )
    }

    logout() {
        this.usuario = undefined;
        sessionStorage.clear();
    }
    
}