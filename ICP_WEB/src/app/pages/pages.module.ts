import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { StocksComponent } from './stocks/stocks.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { VerReparacionComponent } from './ver-reparacion/ver-reparacion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { AltasComponent } from './altas/altas.component';
import { AltaUsuarioComponent } from './dialogs/alta-usuario.component';



@NgModule({
  declarations: [
    LoginComponent,
    RepuestosComponent,
    StocksComponent,
    ReparacionesComponent,
    VerReparacionComponent,
    UsuariosComponent,
    ArticulosComponent,
    AltasComponent,
    AltaUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
