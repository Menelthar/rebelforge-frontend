// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist-management/services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  artists: any[] = [];
  userName: string = '';
  searchQuery: string = '';
  selectedLocation: string = '';
  selectedStyle: string = '';
  selectedStudio: string = '';

  constructor(
    private artistService: ArtistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe({
      next: (data: any[]) => this.artists = data,
      error: (error: any) => console.error('Error al cargar los artistas:', error)
    });
  }

  getUserName(): void {
    this.userName = 'Invitado';
  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      // Redirigir a la página de resultados de búsqueda con los parámetros
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