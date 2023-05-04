import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { Perfil } from 'src/app/core/interfaces/Perfil.interface';
import { catchError } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class AltaUsuarioComponent implements OnInit {

  formularioUsuario!: FormGroup;
  @Output() formClosed = new EventEmitter();
  opcionesPerfil: Perfil[];
  private token: string;


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaUsuarioComponent>,
    private toastService: ToastService,
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

  cargarPerfiles() {
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
        .pipe(
          catchError( response => {

            if(response.error.retCode === 101){
              this.toastService.toastGenerator("Error", "Ya existe un usuario con ese nombre", 4)
            }

            if(response.error.retCode === 102){
              this.toastService.toastGenerator("Error", "Ya existe un usuario con ese email", 4)
            }

            throw response
          })
        )
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog


    }
  }


}
