import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Cambié la URL base para poder reutilizar en los endpoints de login y register
  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    this.authenticated.next(!!token);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  // Realizar login
  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      }),
      map(response => !!response.token),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al iniciar sesión:', error.message);
        return of(false);
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(name: string, email: string, password: string, role: string = 'user'): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      name,
      email,
      password,
      role
    };
  
    return this.http.post<{ id: string }>(`${this.apiUrl}/users`, body, { headers }).pipe(
      tap(response => {
        if (response.id) {
          console.log('Usuario registrado exitosamente');
        }
      }),
      map(response => !!response.id),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al registrar:', error.message);
        return of(false);
      })
    );
  }
  

  // Método para cerrar sesión
  logout(): void {
    this.clearToken();
    this.authenticated.next(false);
    // Redirigir al home sin hacer más tareas que puedan retrasar la redirección
    this.router.navigate(['/home']).then(() => {
      console.log('Redirigido exitosamente a home');
    });
  }

  // Almacenar el token de autenticación en localStorage
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.authenticated.next(true);
  }

  // Eliminar el token de autenticación
  private clearToken(): void {
    localStorage.removeItem('authToken');
    this.authenticated.next(false);
  }

  // Obtener el token de autenticación
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
