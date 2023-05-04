import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';
import { AltaUsuarioComponent } from '../../../shared/dialogs/alta-usuario/alta-usuario.component';
import { EditarUsuarioComponent } from '../../../shared/dialogs/editar-usuario/editar-usuario.component';
import { bindCallback } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';


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
    private editarUsuarioDialog : MatDialog,
    private toastService: ToastService,
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
      this.toastService.toastGenerator("Aviso", "usuario editado correctamente", 2)
    });
    
  }

  cambiarEstadoUsuario(IdUsuario : number) {
    this.apiService.postCambiarEstadoUsuario(IdUsuario, this.token)
      .subscribe(response => {
        this.cargarUsuarios();
        this.toastService.toastGenerator("Aviso", "Estado cambiado correctamente", 2)
      });
  }

}
