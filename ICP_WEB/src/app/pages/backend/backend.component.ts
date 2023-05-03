import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { ResetPasswordComponent } from '../../shared/dialogs/reset-password/reset-password.component';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent {

  private datosUsuario;


  constructor(
    private resetPasswordDialog: MatDialog,
  ){
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
    this.comprobarOneTimePassword()
  }

  comprobarOneTimePassword() {
    if(this.datosUsuario.reset_Password == 0) {
      
      const dialogRef = this.resetPasswordDialog.open(ResetPasswordComponent);

    }
  }

  perfilActual(){
    return this.datosUsuario['id_Perfil'];
  }

}
