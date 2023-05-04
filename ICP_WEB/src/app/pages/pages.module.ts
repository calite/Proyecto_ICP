import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RepuestosComponent } from './backend/repuestos/repuestos.component';
import { StocksComponent } from './backend/stocks/stocks.component';
import { ReparacionesComponent } from './backend/reparaciones/reparaciones.component';
import { VerReparacionComponent } from './backend/ver-reparacion/ver-reparacion.component';
import { UsuariosComponent } from './backend/usuarios/usuarios.component';
import { ArticulosComponent } from './backend/articulos/articulos.component';
import { BackendComponent } from './backend/backend.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ImageModule } from 'primeng/image';



@NgModule({
  declarations: [
    LoginComponent,
    RepuestosComponent,
    StocksComponent,
    ReparacionesComponent,
    VerReparacionComponent,
    UsuariosComponent,
    ArticulosComponent,
    BackendComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    ImageModule,
  ]
})
export class PagesModule { }
