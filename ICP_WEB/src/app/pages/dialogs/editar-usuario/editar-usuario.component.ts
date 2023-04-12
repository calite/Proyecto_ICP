import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api.service';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {

  formularioEditarUsuario!: FormGroup;
  @Output() formClosed = new EventEmitter();
  opcionesPerfil = new Map([
    [10, 'administrador'],
    [20, 'operador'],
    [30, 'gestor']
  ]);

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      usuario: UsuarioPerfil
    }
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioEditarUsuario = this.formBuilder.group({
      nombreUsuario: [this.data.usuario.usuario, Validators.required],
      correoElectronico: [this.data.usuario.email, [Validators.required, Validators.email]],
      perfil: [this.data.usuario.descripcion, Validators.required]
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioEditarUsuario(): void {

    if (this.formularioEditarUsuario.valid) {

      var Id_Usuario = this.data.usuario.id_Usuario;
      var nombreUsuario = this.formularioEditarUsuario.get('nombreUsuario')?.value;
      var correoElectronico = this.formularioEditarUsuario.get('correoElectronico')?.value;
      var perfil = this.formularioEditarUsuario.get('perfil')?.value;
      var IdPerfil = this.buscarClave(perfil, this.opcionesPerfil);

      this.apiService.postEditarUsuario(Id_Usuario, nombreUsuario, correoElectronico, IdPerfil)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamo el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos dialog

    }
  }

  buscarClave(valorBuscado: any, objetoMap: any) {
    for (const [clave, valor] of objetoMap) {
      if (valor === valorBuscado) {
        return clave;
      }
    }
    return null;
  }
}
