import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { VerReparacionComponent } from './pages/ver-reparacion/ver-reparacion.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { AltasComponent } from './pages/altas/altas.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: AltasComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'reparaciones',
    component: ReparacionesComponent
  },
  {
    path: 'detalle/:id_Reparacion',
    component: VerReparacionComponent
  },
  {
    path: 'articulos',
    component: ArticulosComponent
  },
  {
    path: 'repuestos',
    component: RepuestosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
