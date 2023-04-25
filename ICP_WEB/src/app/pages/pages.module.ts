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
import { AltasComponent } from './altas/altas.component';
import { AltaUsuarioComponent } from '../components/alta-usuario/alta-usuario.component';
import { CambiarEstadoReparacionComponent } from '../components/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from '../components/cambiar-estado-sintoma/cambiar-estado-sintoma.component';
import { CambiarStockComponent } from '../components/cambiar-stock/cambiar-stock.component';
import { EditarRepuestoComponent } from '../components/editar-repuesto/editar-repuesto.component';
import { AltaRepuestoComponent } from '../components/alta-repuesto/alta-repuesto.component';
import { EditarArticuloComponent } from '../components/editar-articulo/editar-articulo.component';
import { AltaArticuloComponent } from '../components/alta-articulo/alta-articulo/alta-articulo.component';
import { EditarUsuarioComponent } from '../components/editar-usuario/editar-usuario.component';
import { BackendComponent } from './backend/backend.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';



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
    AltaUsuarioComponent,
    CambiarEstadoReparacionComponent,
    CambiarEstadoSintomaComponent,
    CambiarStockComponent,
    EditarRepuestoComponent,
    AltaRepuestoComponent,
    EditarArticuloComponent,
    AltaArticuloComponent,
    EditarUsuarioComponent,
    BackendComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule
  ]
})
export class PagesModule { }
