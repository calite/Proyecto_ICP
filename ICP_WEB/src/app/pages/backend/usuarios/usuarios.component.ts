import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';
import { AltaUsuarioComponent } from '../../../components/alta-usuario/alta-usuario.component';
import { EditarUsuarioComponent } from '../../../components/editar-usuario/editar-usuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios !: UsuarioPerfil[];
  usuario !: UsuarioPerfil;
  private token : string;

  
  constructor(
    private apiService : ApiService,
    private altaUsuarioDialog: MatDialog,
    private editarUsuarioDialog : MatDialog
  ) { 
    this.token = sessionStorage.getItem('token');
   }

  ngOnInit() {
    this.cargarUsuarios()
  }

  cargarUsuarios() {
    this.apiService.getUsuariosPerfiles(this.token)
      .subscribe( usuarios => {
        this.usuarios = usuarios;
      });
  }

  crearUsuario() {
    const dialogRef = this.altaUsuarioDialog.open(AltaUsuarioComponent);
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarUsuarios();
    });
  }

  editarUsuario(id_Usuario : number) {
    this.usuarios.forEach((usuario) => {
      if (usuario.id_Usuario === id_Usuario) {
        this.usuario = usuario;
      }
    });

    const dialogRef = this.editarUsuarioDialog.open(EditarUsuarioComponent, {
      data: {
        usuario: this.usuario
      }
    });
    
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarUsuarios();
    });
    
  }

  cambiarEstadoUsuario(IdUsuario : number) {
    this.apiService.postCambiarEstadoUsuario(IdUsuario, this.token)
      .subscribe(response => {
        this.cargarUsuarios();
      });
  }

}
