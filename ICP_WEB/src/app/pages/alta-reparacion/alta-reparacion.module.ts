import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { TransporteComponent } from './transporte/transporte.component';
import { AltaReparacionRoutingModule } from './alta-reparacion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TipoTelefonoComponent,
    SintomasComponent,
    TransporteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AltaReparacionRoutingModule
  ]
})
export class AltaReparacionModule { }
