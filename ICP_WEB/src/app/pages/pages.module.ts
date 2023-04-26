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
// import { AltaUsuarioComponent } from '../shared/dialogs/alta-usuario/alta-usuario.component';
// import { CambiarEstadoReparacionComponent } from '../shared/dialogs/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
// import { CambiarEstadoSintomaComponent } from '../shared/dialogs/cambiar-estado-sintoma/cambiar-estado-sintoma.component';
// import { CambiarStockComponent } from '../shared/dialogs/cambiar-stock/cambiar-stock.component';
// import { EditarRepuestoComponent } from '../shared/dialogs/editar-repuesto/editar-repuesto.component';
// import { AltaRepuestoComponent } from '../shared/dialogs/alta-repuesto/alta-repuesto.component';
// import { EditarArticuloComponent } from '../shared/dialogs/editar-articulo/editar-articulo.component';
// import { AltaArticuloComponent } from '../shared/dialogs/alta-articulo/alta-articulo.component';
// import { EditarUsuarioComponent } from '../shared/dialogs/editar-usuario/editar-usuario.component';
import { BackendComponent } from './backend/backend.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RepuestosComponent,
    StocksComponent,
    ReparacionesComponent,
    VerReparacionComponent,
    UsuariosComponent,
    ArticulosComponent,
    // AltaUsuarioComponent,
    // CambiarEstadoReparacionComponent,
    // CambiarEstadoSintomaComponent,
    // CambiarStockComponent,
    // EditarRepuestoComponent,
    // AltaRepuestoComponent,
    // EditarArticuloComponent,
    // AltaArticuloComponent,
    // EditarUsuarioComponent,
    BackendComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    SharedModule,
  ]
})
export class PagesModule { }
