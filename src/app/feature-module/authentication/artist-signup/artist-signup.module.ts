import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistSignupComponent } from './artist-signup/artist-signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ArtistSignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ArtistSignupModule { }
