import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReparacionesComponent } from './pages/backend/reparaciones/reparaciones.component';
import { RepuestosComponent } from './pages/backend/repuestos/repuestos.component';
import { StocksComponent } from './pages/backend/stocks/stocks.component';
import { VerReparacionComponent } from './pages/backend/ver-reparacion/ver-reparacion.component';
import { UsuariosComponent } from './pages/backend/usuarios/usuarios.component';
import { ArticulosComponent } from './pages/backend/articulos/articulos.component';
import { AltasComponent } from './pages/altas/altas.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { BackendComponent } from './pages/backend/backend.component';
import { PublicGuard } from './core/guards/public.guard';
import { RolGuard } from './core/guards/rol.guard';
import { AltaReparacionModule } from './pages/alta-reparacion/alta-reparacion.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'alta-reparacion',
    loadChildren: () => import('./pages/alta-reparacion/alta-reparacion.module').then( m => m.AltaReparacionModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path: 'administracion',
    component: BackendComponent,
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: 'administracion/usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard, RolGuard],
    canMatch: [AuthGuard],
    data: { roles: [10] }
  },
  {
    path: 'administracion/reparaciones',
    component: ReparacionesComponent,
    canActivate: [AuthGuard, RolGuard],
    canMatch: [AuthGuard],
    data: { roles: [10, 20, 30] }
  },
  {
    path: 'administracion/reparaciones/detalles/:id_Reparacion',
    component: VerReparacionComponent,
    canActivate: [AuthGuard, RolGuard],
    canMatch: [AuthGuard],
    data: { roles: [10, 20, 30] }
  },
  {
    path: 'administracion/articulos',
    component: ArticulosComponent,
    canActivate: [AuthGuard, RolGuard],
    canMatch: [AuthGuard],
    data: { roles: [10] }
  },
  {
    path: 'administracion/repuestos',
    component: RepuestosComponent,
    canActivate: [AuthGuard, RolGuard],
    canMatch: [AuthGuard],
    data: { roles: [10, 30] }
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
