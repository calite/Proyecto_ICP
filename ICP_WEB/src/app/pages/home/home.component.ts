import { Component, OnInit } from '@angular/core';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public usuarioConectado: boolean = true;
  private token: string;

  constructor(){
    this.token = sessionStorage.getItem('token')
    this.existeToken()
  }

  private existeToken() {
    
    if (this.token != null && this.token != '') {
      this.usuarioConectado = true;
    } else {
      this.usuarioConectado = false;
    }

  }

}
