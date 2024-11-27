import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación del AuthService
    this.authService.isAuthenticated().subscribe((authStatus: boolean) => {
      this.isAuthenticated = authStatus;
    });
  }

  // Método que maneja el evento click en el botón de "Cuenta"
  onCuentaClick(): void {
    if (this.isAuthenticated) {
      console.log('Abrir menú de cuenta');
    } else {
      console.log('Mostrar opciones de autenticación');
    }
  }
}
