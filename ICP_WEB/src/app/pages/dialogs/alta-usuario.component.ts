import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent  implements OnInit {

  formularioUsuario!: FormGroup;
  opcionesPerfil: string[] = ['Administrador', 'Usuario', 'Invitado'];

  constructor(private formBuilder: FormBuilder) { }

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
      console.log(this.formularioUsuario.value);
    }
  }

}
