import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    private comprobarEstadoAutentificacion(): boolean | Observable<boolean> {
        return this.authService.comprobarAutenticacion()
            .pipe(
                tap(estaLogeado => {
                    if (!estaLogeado) {
                        this.router.navigate(['./login'])
                    }
                }),

            )
    }


    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        return this.comprobarEstadoAutentificacion()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.comprobarEstadoAutentificacion()
    }


}