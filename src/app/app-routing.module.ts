import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './pages/areas/areas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'areas', component: AreasComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
