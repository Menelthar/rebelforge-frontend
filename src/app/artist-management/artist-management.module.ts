import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistManagementRoutingModule } from './artist-management-routing.module';

// Importación de módulos específicos para los componentes de la gestión de artistas
import { ArtistListModule } from './artist-list/artist-list.module';
import { ArtistProfileModule } from './artist-profile/artist-profile.module';
import { ArtistAvailabilityModule } from './artist-availability/artist-availability.module';
import { ArtistReviewsModule } from './artist-reviews/artist-reviews.module';

@NgModule({
  declarations: [
    // Puedes añadir aquí los componentes generales del módulo que no pertenezcan a un submódulo específico.
  ],
  imports: [
    CommonModule,
    ArtistManagementRoutingModule,
    ArtistListModule,          // Módulo para la lista de artistas
    ArtistProfileModule,       // Módulo para el perfil de artista
    ArtistAvailabilityModule,  // Módulo para la disponibilidad de artista
    ArtistReviewsModule        // Módulo para las reseñas de los artistas
  ]
})
export class ArtistManagementModule { }
