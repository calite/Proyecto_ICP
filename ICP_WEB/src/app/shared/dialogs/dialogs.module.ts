import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AltaArticuloComponent } from './alta-articulo/alta-articulo.component';
import { AltaRepuestoComponent } from './alta-repuesto/alta-repuesto.component';
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
import { CambiarEstadoReparacionComponent } from './cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from './cambiar-estado-sintoma/cambiar-estado-sintoma.component';
import { CambiarStockComponent } from './cambiar-stock/cambiar-stock.component';
import { EditarArticuloComponent } from './editar-articulo/editar-articulo.component';
import { EditarRepuestoComponent } from './editar-repuesto/editar-repuesto.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { PuntosRecogidaComponent } from './puntos-recogida/puntos-recogida.component';
import { OrderListModule } from 'primeng/orderlist';
import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AltaArticuloComponent,
    AltaRepuestoComponent,
    AltaUsuarioComponent,
    CambiarEstadoReparacionComponent,
    CambiarEstadoSintomaComponent,
    CambiarStockComponent,
    EditarArticuloComponent,
    EditarRepuestoComponent,
    EditarUsuarioComponent,
    ResetPasswordComponent,
    MapDialogComponent,
    PuntosRecogidaComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    OrderListModule,
  ],
  exports: [
    AltaArticuloComponent,
    AltaRepuestoComponent,
    AltaUsuarioComponent,
    CambiarEstadoReparacionComponent,
    CambiarEstadoSintomaComponent,
    CambiarStockComponent,
    EditarArticuloComponent,
    EditarRepuestoComponent,
    EditarUsuarioComponent,
    MapDialogComponent,
    PuntosRecogidaComponent
  ]
})
export class DialogsModule { }
