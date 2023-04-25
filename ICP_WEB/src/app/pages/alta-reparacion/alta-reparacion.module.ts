import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { TransporteComponent } from './transporte/transporte.component';
import { AltaReparacionRoutingModule } from './alta-reparacion-routing.module';



@NgModule({
  declarations: [
    TipoTelefonoComponent,
    SintomasComponent,
    TransporteComponent
  ],
  imports: [
    CommonModule,
    AltaReparacionRoutingModule
  ]
})
export class AltaReparacionModule { }
