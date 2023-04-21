import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { VerReparacionComponent } from './pages/ver-reparacion/ver-reparacion.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { AltasComponent } from './pages/altas/altas.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { BackendComponent } from './pages/backend/backend.component';
import { PublicGuard } from './core/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'alta',
    component: AltasComponent
  },
  {
    path: 'administracion',
    component: BackendComponent,
  },
  {
    path: 'administracion/login',
    component: LoginComponent,
    canActivate : [ PublicGuard ],
    canMatch : [ PublicGuard ]
  },
  {
    path: 'administracion/usuarios',
    component: UsuariosComponent,
    canActivate : [ AuthGuard ],
    canMatch : [ AuthGuard ]
  },
  {
    path: 'administracion/reparaciones',
    component: ReparacionesComponent,
    canActivate : [ AuthGuard ],
    canMatch : [ AuthGuard ]
  },
  {
    path: 'administracion/reparaciones/detalles/:id_Reparacion',
    component: VerReparacionComponent,
    canActivate : [ AuthGuard ],
    canMatch : [ AuthGuard ]
  },
  {
    path: 'administracion/articulos',
    component: ArticulosComponent,
    canActivate : [ AuthGuard ],
    canMatch : [ AuthGuard ]
  },
  {
    path: 'administracion/repuestos',
    component: RepuestosComponent,
    canActivate : [ AuthGuard ],
    canMatch : [ AuthGuard ]
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
