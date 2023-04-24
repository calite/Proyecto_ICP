import { Component } from '@angular/core';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent {

  private datosUsuario;


  constructor(){
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
  }

  perfilActual(){
    return this.datosUsuario['id_Perfil'];
  }

}
