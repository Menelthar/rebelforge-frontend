import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist-management/services/artist.service';
import { AuthService } from '../shared/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  artists: any[] = [];
  userName: string = 'Invitado'; // Nombre del usuario por defecto
  searchQuery: string = '';
  selectedLocation: string = '';
  selectedStyle: string = '';
  selectedStudio: string = '';

  constructor(
    private artistService: ArtistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArtists();
    this.getUserName(); // Obtener el nombre del usuario al iniciar
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe({
      next: (data: any[]) => this.artists = data,
      error: (error: any) => console.error('Error al cargar los artistas:', error)
    });
  }

  getUserName(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.name) {
        this.userName = user.name; // Actualizar el nombre del usuario si está autenticado
      } else {
        this.userName = 'Invitado';
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/buscar'], { 
        queryParams: {
          query: this.searchQuery,
          location: this.selectedLocation,
          style: this.selectedStyle,
          studio: this.selectedStudio
        }
      });
    }
  }
}
