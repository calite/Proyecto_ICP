
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  @Output() loginEmitter = new EventEmitter();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      usuario: ['gestor', Validators.required],
      password: ['gestor', Validators.required],
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

          this.loginEmitter.emit();

          this.router.navigate(['/administracion']);
        });
    }
  }
}
