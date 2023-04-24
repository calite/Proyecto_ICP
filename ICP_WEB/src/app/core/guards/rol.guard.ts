import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RolGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }



    private comprobarPerfilUsuario(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
        

        const usuarioActual = JSON.parse(sessionStorage.getItem('datos'))

        const rolesPermitidos = route.data.roles as Array<number>

        if(usuarioActual && rolesPermitidos.includes(usuarioActual.id_Perfil)) {
            return true;
        } else {
            this.router.navigate(['./administracion'])
            return false;
        }

    }

    // canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    //     return this.comprobarPerfilUsuario()
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.comprobarPerfilUsuario(route)
    }


}