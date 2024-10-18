import { Component } from '@angular/core';
import { AuthService } from '../../../shared/core/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    // Chequea si el usuario está autenticado al cargar el componente
    this.authService.isAuthenticated().subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
  }

  onCuentaClick(): void {
    // Puedes agregar lógica aquí si es necesario cuando se hace clic en el botón "Cuenta"
    if (!this.isAuthenticated) {
      console.log('El usuario no está autenticado, mostrando opciones de login/registro.');
    }
  }
}
