import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  formularioUsuario!: FormGroup;
  opcionesPerfil = new Map([
    [10, 'administrador'],
    [20, 'operador'],
    [30, 'gestor']
  ]);
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AltaUsuarioComponent>
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas para cada campo
    this.formularioUsuario = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      perfil: ['', Validators.required]
    });
  }

  // Método que se llama al enviar el formulario
  submitFormularioUsuario(): void {
    // Si el formulario es válido, muestra los datos del usuario en la consola
    if (this.formularioUsuario.valid) {

      var nombreUsuario = this.formularioUsuario.get('nombreUsuario')?.value;
      var correoElectronico = this.formularioUsuario.get('correoElectronico')?.value;
      var perfil = this.formularioUsuario.get('perfil')?.value;
      var IdPerfil = this.buscarClave(perfil, this.opcionesPerfil);

      this.apiService.postAltaUsuario(nombreUsuario, correoElectronico, IdPerfil)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog


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
