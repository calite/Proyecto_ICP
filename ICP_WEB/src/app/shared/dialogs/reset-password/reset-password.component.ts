import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class ResetPasswordComponent {

  formularioResetPassword: FormGroup;

  private token: string;

  constructor(
    private authService: AuthService,
    private formBuilder : FormBuilder,
    private dialogRef :  MatDialogRef<ResetPasswordComponent>,
    private toastService : ToastService
  ) { 
    this.token = sessionStorage.getItem('token');

    this.formularioResetPassword = this.formBuilder.group({
      password : ['',Validators.required]
    });
  }

  submitResetPassword() {

    if(this.formularioResetPassword.valid) {

      var Id_Usuario = JSON.parse(sessionStorage.getItem('datos')).id_Usuario;
      var newPassword = this.formularioResetPassword.get('password').value;

      this.authService.postResetPassword(Id_Usuario,newPassword,this.token)
        .subscribe( (response) => {
            this.dialogRef.close();
            this.toastService.toastGenerator('Aviso!','Contraseña cambiada',2)
        })

    }

  }


}
