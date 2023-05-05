import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { TransporteComponent } from './transporte/transporte.component';
import { AltaReparacionRoutingModule } from './alta-reparacion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    TipoTelefonoComponent,
    SintomasComponent,
    TransporteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AltaReparacionRoutingModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class AltaReparacionModule { }
