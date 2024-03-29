import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { OcultarPasswordPipe } from './pipes/ocultar-password.pipe';
import { EstadoActivoPipe } from './pipes/estado-activo.pipe';
import { DialogsModule } from './dialogs/dialogs.module';
import { AltaArticuloComponent } from './dialogs/alta-articulo/alta-articulo.component';
import { AltaRepuestoComponent } from './dialogs/alta-repuesto/alta-repuesto.component';
import { AltaUsuarioComponent } from './dialogs/alta-usuario/alta-usuario.component';
import { CambiarEstadoReparacionComponent } from './dialogs/cambiar-estado-reparacion/cambiar-estado-reparacion.component';
import { CambiarEstadoSintomaComponent } from './dialogs/cambiar-estado-sintoma/cambiar-estado-sintoma.component';
import { CambiarStockComponent } from './dialogs/cambiar-stock/cambiar-stock.component';
import { EditarArticuloComponent } from './dialogs/editar-articulo/editar-articulo.component';
import { EditarRepuestoComponent } from './dialogs/editar-repuesto/editar-repuesto.component';
import { EditarUsuarioComponent } from './dialogs/editar-usuario/editar-usuario.component';
import { PuntosRecogidaComponent } from './dialogs/puntos-recogida/puntos-recogida.component';

import { MapDialogComponent } from './dialogs/map-dialog/map-dialog.component';

import { DialogModule } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ImageModule } from 'primeng/image';
import { OrderListModule } from 'primeng/orderlist';







@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    OcultarPasswordPipe,
    EstadoActivoPipe,
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    OcultarPasswordPipe,
    EstadoActivoPipe,
    AltaUsuarioComponent,
    CambiarEstadoReparacionComponent,
    CambiarEstadoSintomaComponent,
    CambiarStockComponent,
    EditarRepuestoComponent,
    AltaRepuestoComponent,
    EditarArticuloComponent,
    AltaArticuloComponent,
    EditarUsuarioComponent,
    MapDialogComponent,
    PuntosRecogidaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DialogsModule,
    // DialogModule,
    MatCardModule,
    MatIconModule,
    ImageModule,
    OrderListModule,
  ]
})
export class SharedModule { }
