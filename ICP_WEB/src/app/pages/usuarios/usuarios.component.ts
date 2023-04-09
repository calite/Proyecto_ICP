import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';
import { UsuariosPerfiles } from 'src/app/core/interfaces/UsuariosPerfiles.interface';
import { AltaUsuarioComponent } from '../dialogs/alta-usuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios !: UsuariosPerfiles[];

  
  constructor(
    private apiService : ApiService,
    private altaUsuarioDialog: MatDialog
  ) { }

  ngOnInit() {
    this.apiService.getUsuariosPerfiles()
      .subscribe( usuarios => {
        this.usuarios = usuarios;
      });
  }

  crearUsuario() {
    this.altaUsuarioDialog.open(AltaUsuarioComponent);
  }

  editarUsuario(id_Usuario : number) {
    console.log(id_Usuario)
  }

  cambiarEstadoUsuario(id_Usuario : number) {
    console.log(id_Usuario)
  }

}
