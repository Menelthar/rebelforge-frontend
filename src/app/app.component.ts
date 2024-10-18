import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RebelForge';

  constructor(private authService: AuthService, private router: Router) {
    // Asegurarse de que la navegación se complete
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lógica adicional si es necesario
        console.log('Navigación completada', event.url);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
