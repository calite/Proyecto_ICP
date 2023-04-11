import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';
import { AltaUsuarioComponent } from '../dialogs/alta-usuario/alta-usuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios !: UsuarioPerfil[];

  
  constructor(
    private apiService : ApiService,
    private altaUsuarioDialog: MatDialog
  ) { }

  ngOnInit() {
    this.apiService.getUsuariosPerfiles()
      .subscribe( usuarios => {
        this.usuarios = usuarios;
        console.log(usuarios)
      });
  }

  crearUsuario() {
    this.altaUsuarioDialog.open(AltaUsuarioComponent);
  }

  editarUsuario(IdUsuario : number) {
    console.log(IdUsuario)
  }

  cambiarEstadoUsuario(IdUsuario : number) {
    console.log(IdUsuario)
  }

}
