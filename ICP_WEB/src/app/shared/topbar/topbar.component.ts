import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

  public usuarioConectado: boolean = false;
  private token: string;
  private datosUsuario: UsuarioPerfil;
  private authServiceSubscription : Subscription | undefined;

  get nombreUsuario() {
    return this.datosUsuario.usuario;
  }

  constructor(
    private authService: AuthService,
    private router : Router
  ) {

    this.token = sessionStorage.getItem('token')
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
  }

  ngOnInit(): void {

    this.authServiceSubscription = this.authService.usuarioObservable.subscribe(
      usuarioActual => {
        this.existeToken()
      }
    );
    
  }

  private existeToken() {
    if (this.token != null && this.token != '') {
      this.usuarioConectado = true;
    } else {
      this.usuarioConectado = false;
    }

  }

  logout() {
    this.usuarioConectado = false;
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/login'])
  }
}
