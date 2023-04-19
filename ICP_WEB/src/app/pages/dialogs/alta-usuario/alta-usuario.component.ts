import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api.service';
import { Perfil } from 'src/app/core/interfaces/Perfil.interface';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  formularioUsuario!: FormGroup;
  @Output() formClosed = new EventEmitter();
  opcionesPerfil : Perfil[];
  private token : string;


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaUsuarioComponent>
  ) {
    this.token = sessionStorage.getItem('token');

    this.formularioUsuario = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      perfil: ['', Validators.required]
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
  submitFormularioUsuario(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola
    if (this.formularioUsuario.valid) {

      var nombreUsuario = this.formularioUsuario.get('nombreUsuario')?.value;
      var correoElectronico = this.formularioUsuario.get('correoElectronico')?.value;
      var IdPerfil = this.formularioUsuario.get('perfil')?.value;

      this.apiService.postAltaUsuario(nombreUsuario, correoElectronico, IdPerfil, this.token)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog


    }
  }

  
}
