import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private apiService : ApiService,
    private formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      usuario : ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  submitLogin() {

    if(this.formLogin.valid){

      var usuario = this.formLogin.value.usuario;
      var password = this.formLogin.value.password;

      this.apiService.postLogin(usuario,password)
      .subscribe( resp => {
        var token = resp['token'];
        sessionStorage.setItem('token', token.token);
      });
    }

    
  }
}
