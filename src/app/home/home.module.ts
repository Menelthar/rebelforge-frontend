import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importar RouterModule para poder usar [routerLink]
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,       // Proporciona directivas como *ngFor y *ngIf
    RouterModule,       // Importar RouterModule para que [routerLink] funcione en HomeComponent
    HomeRoutingModule
  ]
})
export class HomeModule { }
