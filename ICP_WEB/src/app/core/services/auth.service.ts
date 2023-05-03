import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioPerfil } from '../interfaces/UsuarioPerfil.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private apiUrl: string = 'https://localhost:7198/api/';
    private usuario?: UsuarioPerfil;
    private usuarioActualSubject : BehaviorSubject<UsuarioPerfil> = new BehaviorSubject({} as UsuarioPerfil)
    public readonly usuarioObservable: Observable<UsuarioPerfil> = this.usuarioActualSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    
    get usuarioActual(): UsuarioPerfil | undefined | null {
        if (!this.usuario) return undefined;
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
                tap(respuesta => {
                    this.usuario = respuesta['value']
                    sessionStorage.setItem('datos', JSON.stringify(this.usuario));
                    sessionStorage.setItem('token', respuesta['token']['token'])
                    this.usuarioActualSubject.next(respuesta['value']);
                    window.location.reload();
                })
            );
    }

    comprobarAutenticacion(): Observable<boolean> {
        if (!sessionStorage.getItem('token')) return of(false)
        return of(true)
    }

    postResetPassword(Id_Usuario : number, Password : string, token : string) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        const url = `${this.apiUrl}usuarios/reset_password`;
        const body = {
            Id_Usuario: Id_Usuario,
            Password: Password,
        };
        return this.http.post(url, body, httpOptions);
    }

    logout() {
        this.usuario = undefined;
        sessionStorage.clear();
        this.router.navigate(['./']);
        window.location.reload();
    }

}