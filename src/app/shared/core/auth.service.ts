import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // URL base para reutilizar en los endpoints de login y user
  private authenticated = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  private user: any = null;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    console.log('Token obtenido del localStorage:', token);
    this.authenticated.next(!!token);

    if (token) {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
      console.log('Usuario almacenado al iniciar:', this.user);
      this.currentUserSubject.next(this.user);
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  // Obtener el usuario actual
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Realizar login
  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    console.log('Iniciando sesión con:', body);

    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/auth/login`, body, { headers }).pipe(
      tap(response => {
        console.log('Respuesta del servidor al iniciar sesión:', response);
        if (response.token) {
          this.setToken(response.token);
        }
      }),
      switchMap(response => this.getUserById(response.userId)), // Obtener detalles del usuario
      map(user => {
        console.log('Usuario obtenido después de login:', user);
        if (user) {
          this.setUser(user); // Guardar la información del usuario
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al iniciar sesión:', error.message);
        return of(false);
      })
    );
  }

  // Obtener detalles del usuario por ID
  private getUserById(userId: string): Observable<any> {
    console.log('Obteniendo detalles del usuario por ID:', userId);
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
      tap(user => {
        console.log('Detalles del usuario obtenidos:', user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los detalles del usuario:', error.message);
        return of(null);
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(name: string, email: string, password: string, role: string = 'user'): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, email, password, role };
    console.log('Registrando usuario con:', body);

    return this.http.post<{ id: string }>(`${this.apiUrl}/users`, body, { headers }).pipe(
      tap(response => {
        console.log('Respuesta del servidor al registrar usuario:', response);
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
    console.log('Cerrando sesión...');
    this.clearToken();
    this.clearUser();
    this.authenticated.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']).then(() => {
      console.log('Redirigido exitosamente a home');
    });
  }

  // Almacenar el token de autenticación en localStorage
  private setToken(token: string): void {
    console.log('Almacenando token en localStorage:', token);
    localStorage.setItem('authToken', token);
    this.authenticated.next(true);
  }

  // Guardar la información del usuario en localStorage
  private setUser(user: any): void {
    console.log('Almacenando usuario en localStorage:', user);
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Eliminar la información del usuario
  private clearUser(): void {
    console.log('Eliminando información del usuario...');
    this.user = null;
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Obtener la información del usuario
  getUser(): any {
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
      console.log('Usuario obtenido del localStorage:', this.user);
    }
    return this.user;
  }

  // Eliminar el token de autenticación
  private clearToken(): void {
    console.log('Eliminando token de autenticación del localStorage');
    localStorage.removeItem('authToken');
    this.authenticated.next(false);
  }

  // Obtener el token de autenticación
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Token obtenido:', token);
    return token;
  }
}
