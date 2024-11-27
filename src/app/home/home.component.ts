import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArtistService } from '../artist-management/services/artist.service';
import { AuthService } from '../shared/core/auth.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  artists: any[] = [];
  filteredArtists: any[] = [];
  userName: string = 'Invitado';
  searchControl: FormControl = new FormControl();
  searchQuery: string = '';
  selectedLocation: string = '';
  selectedStyle: string = '';
  selectedState: string = '';

  // Definir las opciones para los filtros
  locations: string[] = ['Norte', 'Sur', 'Centro', 'Este', 'Oeste'];
  states: string[] = ['Ciudad de México', 'Jalisco', 'Nuevo León', 'Yucatán', 'Estado de México'];
  styles: string[] = ['Blackwork', 'Japonés', 'Realismo', 'Neotradicional'];

  // Propiedad para manejar la visibilidad de los filtros
  showFilters: boolean = false;

  constructor(
    private artistService: ArtistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArtists();
    this.getUserName();
    this.setupSearch();
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe({
      next: (data: any[]) => {
        this.artists = data;
        this.filteredArtists = []; // No mostrar artistas hasta aplicar filtros
      },
      error: (error: any) => console.error('Error al cargar los artistas:', error)
    });
  }

  getUserName(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userName = user && user.name ? user.name : 'Invitado';
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.searchQuery = value;
        this.applyFilters();
      });
  }

  applyFilters(): void {
    const searchQueryLower = this.searchQuery.trim().toLowerCase();
    const locationLower = this.selectedLocation.trim().toLowerCase();
    const styleLower = this.selectedStyle.trim().toLowerCase();
    const stateLower = this.selectedState.trim().toLowerCase();

    // Solo mostrar artistas si hay una búsqueda o filtros seleccionados
    this.filteredArtists = this.artists.filter(artist => {
      return (
        (!searchQueryLower || artist.name.toLowerCase().includes(searchQueryLower)) &&
        (!locationLower || artist.location.toLowerCase().includes(locationLower)) &&
        (!styleLower || artist.style.toLowerCase().includes(styleLower)) &&
        (!stateLower || artist.state.toLowerCase().includes(stateLower))
      );
    });
  }

  clearSearch(): void {
    this.searchControl.reset();
    this.searchQuery = '';
    this.selectedLocation = '';
    this.selectedStyle = '';
    this.selectedState = '';
    this.filteredArtists = []; // Limpiar resultados de búsqueda
    this.showFilters = false; // Ocultar los filtros después de limpiar
  }

  toggleFilters(show: boolean = true): void {
    this.showFilters = show;
  }

  hideFilters(): void {
    setTimeout(() => {
      this.showFilters = false;
    }, 200); // Pequeño retraso para evitar ocultar los filtros antes de seleccionar
  }

  contactUs(): void {
    alert('Gracias por tu interés, nos pondremos en contacto pronto.');
  }
}
