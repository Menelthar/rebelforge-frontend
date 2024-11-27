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
  isActive: boolean = false; // Nueva propiedad para verificar si la cuenta está activa

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
        if (user) {
            this.userName = user.name || 'Invitado'; // Establecer el nombre del usuario autenticado
            this.isArtist = user.role && user.role === 'artist'; // Verificar si el usuario es un artista
            this.isActive = user.isVerified; // Verificar si la cuenta está activa
        } else {
            this.userName = 'Invitado';
            this.isArtist = false;
            this.isActive = false; // En caso de que no haya usuario, la cuenta no está activa
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
