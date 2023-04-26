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
    EditarUsuarioComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatCardModule,
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
    EditarUsuarioComponent
  ]
})
export class DialogsModule { }
