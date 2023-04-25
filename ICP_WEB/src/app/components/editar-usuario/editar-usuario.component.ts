import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { Perfil } from 'src/app/core/interfaces/Perfil.interface';
import { UsuarioPerfil } from 'src/app/core/interfaces/UsuarioPerfil.interface';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {

  formularioEditarUsuario!: FormGroup;
  @Output() formClosed = new EventEmitter();
  opcionesPerfil : Perfil[];
  private token : string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      usuario: UsuarioPerfil
    }
  ) {
    this.token = sessionStorage.getItem('token');

    this.formularioEditarUsuario = this.formBuilder.group({
      nombreUsuario: [this.data.usuario.usuario, Validators.required],
      passUsuario: ['', Validators.required],
      correoElectronico: [this.data.usuario.email, [Validators.required, Validators.email]],
      perfil: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.cargarPerfiles();

  }

  cargarPerfiles(){
    this.apiService.getPerfiles(this.token)
      .subscribe(perfiles => {
        this.opcionesPerfil = perfiles;
      });
  }


  // Método que se llama al enviar el formulario
  submitFormularioEditarUsuario(): void {

    if (this.formularioEditarUsuario.valid) {

      var Id_Usuario = this.data.usuario.id_Usuario;
      var nombreUsuario = this.formularioEditarUsuario.get('nombreUsuario')?.value;
      var passUsuario = this.formularioEditarUsuario.get('passUsuario')?.value;
      var correoElectronico = this.formularioEditarUsuario.get('correoElectronico')?.value;
      var IdPerfil = this.formularioEditarUsuario.get('perfil')?.value;

      this.apiService.postEditarUsuario(Id_Usuario, passUsuario,nombreUsuario, correoElectronico, IdPerfil, this.token)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamo el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos dialog

    }
  }

}
