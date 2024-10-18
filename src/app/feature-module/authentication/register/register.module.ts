import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { RegisterComponent } from './register/register.component'; // Importar RegisterComponent

@NgModule({
  declarations: [
    RegisterComponent // Declarar RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule
    RouterModule // Importar RouterModule para usar routerLink
  ]
})
export class RegisterModule { }
