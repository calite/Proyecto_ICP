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
import { AltaUsuarioComponent } from './dialogs/alta-usuario/alta-usuario.component';
import { CambiarEstadoReparacionComponent } from './dialogs/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from './dialogs/cambiar-estado-sintoma/cambiar-estado-sintoma.component';
import { CambiarStockComponent } from './dialogs/cambiar-stock/cambiar-stock.component';
import { EditarRepuestoComponent } from './dialogs/editar-repuesto/editar-repuesto.component';
import { AltaRepuestoComponent } from './dialogs/alta-repuesto/alta-repuesto.component';
import { EditarArticuloComponent } from './dialogs/editar-articulo/editar-articulo.component';
import { AltaArticuloComponent } from './dialogs/alta-articulo/alta-articulo.component';
import { EditarUsuarioComponent } from './dialogs/editar-usuario/editar-usuario.component';



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
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
