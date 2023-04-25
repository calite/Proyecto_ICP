import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { TransporteComponent } from './transporte/transporte.component';

const routes: Routes = [
  {
    path: '',
    component: TipoTelefonoComponent
  },
  {
    path: 'sintomas',
    component: SintomasComponent
  }, 
  {
    path: 'transporte',
    component: TransporteComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaReparacionRoutingModule { }
