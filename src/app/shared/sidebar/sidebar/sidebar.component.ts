import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarVisible: boolean = false;
  userName: string = 'Invitado';
  isArtist: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener la información del usuario actual
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.name) {
        this.userName = user.name; // Establecer el nombre del usuario autenticado
        this.isArtist = user.role && user.role === 'artist'; // Verificar si el usuario es un artista
      } else {
        this.userName = 'Invitado';
        this.isArtist = false;
      }
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout(): void {
    this.authService.logout();
  }
}
