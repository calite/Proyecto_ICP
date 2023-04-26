
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, AppearanceAnimation, DisappearanceAnimation, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.formLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  submitLogin() {

    if (this.formLogin.valid) {

      var usuario = this.formLogin.value.usuario;
      var password = this.formLogin.value.password;

      this.authService.postLogin(usuario, password)
        .subscribe(resp => {
          var token = resp['token'];
          sessionStorage.setItem('token', token.token);
          this.router.navigate(['/administracion']);

        },
          error => {
            if (error.status = 400) {
              this.toastService.toastGenerator('Error!', 'Los datos son incorrectos.', 4)
            }
          })
    }
  }


}
