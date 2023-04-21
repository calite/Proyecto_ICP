import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public usuarioConectado : boolean = false;
  private token : string;

  constructor(private authService: AuthService ) { }


  ngOnInit(): void {
    
    this.token = sessionStorage.getItem('token')

    this.existeToken()
  }

  private existeToken() {
    if( !this.token == null ) this.usuarioConectado = true;
  }


}
