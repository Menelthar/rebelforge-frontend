import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyAccountComponent } from './verify-account/verify-account.component'; // Asegúrate de que la ruta sea correcta

const routes: Routes = [
  { path: 'verify/:token', component: VerifyAccountComponent }, // Ruta para la verificación de cuenta
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
