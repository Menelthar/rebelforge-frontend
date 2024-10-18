import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private readonly baseUrl = 'http://localhost:8080/api/artists';  // Ruta base para los artistas
  private readonly availabilityUrl = 'http://localhost:8080/api/availability'; // Ruta para disponibilidad

  constructor(private readonly http: HttpClient) { }

  // Obtener todos los artistas
  getAllArtists(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Obtener un artista por ID
  getArtistById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo artista
  createArtist(artist: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, artist);
  }

  // Actualizar un artista existente
  updateArtist(id: string, artist: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, artist);
  }

  // Eliminar un artista por ID
  deleteArtist(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Obtener artistas por estilo
  getArtistsByStyle(style: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/style`, {
      params: { style }
    });
  }

  // Obtener solicitudes pendientes de artistas
  getPendingArtistRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending-requests`);
  }

  // Aprobar solicitud de artista
  approveArtistRequest(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/approve`, {});
  }

  // Rechazar solicitud de artista
  rejectArtistRequest(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/reject`, {});
  }

  // Obtener disponibilidad de citas
  getAvailabilities(): Observable<any> {
    return this.http.get(this.availabilityUrl);
  }
}