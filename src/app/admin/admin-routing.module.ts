import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes que pertenecen al módulo Admin
import { AppointmentListComponent } from './appointment-list/appointment-list/appointment-list.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { UserListComponent } from './user-management/user-list/user-list/user-list.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail/user-detail.component';
import { AuthGuard } from '../shared/guards/auth.guard'; // Importar el AuthGuard

const routes: Routes = [
  { path: 'appointment-list', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'user-management/user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user-management/user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] }, // Ruta que acepta un parámetro ID
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
