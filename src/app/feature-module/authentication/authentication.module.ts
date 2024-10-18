// src/app/feature-module/authentication/authentication.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
// Importar otros componentes necesarios

@NgModule({
  declarations: [
    // Otros componentes de autenticación
    // Elimina LoginComponent si está declarado aquí
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
    // Otros módulos necesarios
  ],
  exports: []
})
export class AuthenticationModule { }
