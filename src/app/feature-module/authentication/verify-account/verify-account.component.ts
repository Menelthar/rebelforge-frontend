import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/core/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  message: string = '';

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token'); // Obtiene el token de la URL como parámetro de consulta

    if (token) {
      this.authService.verifyAccount(token).subscribe(
        (response: any) => {
          if (response && response.success) {
            this.message = 'Cuenta verificada con éxito. Redirigiendo...';
            setTimeout(() => {
              this.router.navigate(['/home']); // Redirige a la página de inicio después de la verificación
            }, 2000); // Añadir un pequeño retraso para que el usuario pueda ver el mensaje
          } else {
            this.message = 'Token inválido o expirado. Por favor intenta nuevamente.';
          }
        },
        (error: any) => {
          console.error('Error de verificación:', error);
          this.message = 'Hubo un error al verificar la cuenta.';
        }
      );
    } else {
      this.message = 'No se proporcionó un token válido para la verificación.';
    }
  }
}
