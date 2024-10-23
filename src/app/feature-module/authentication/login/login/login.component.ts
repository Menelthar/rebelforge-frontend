import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(event?: Event): void {
    event?.preventDefault(); // Evitar comportamiento por defecto del enlace
    
    // Si el formulario es inválido o ya se está cargando, no continuar
    if (this.loginForm.invalid || this.isLoading) {
      console.warn('Formulario inválido o ya se está intentando iniciar sesión');
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Reiniciar el mensaje de error antes de intentar iniciar sesión

    const { username, password } = this.loginForm.value;

    console.log('Intentando iniciar sesión con usuario:', username);

    this.authService.login(username, password).subscribe({
      next: (isLoggedIn) => {
        this.isLoading = false;
        if (isLoggedIn) {
          console.log('Inicio de sesión exitoso');
          // Obtener la URL a la que intentaba acceder antes del login
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          console.log('Redirigiendo a:', returnUrl);
          this.router.navigateByUrl(returnUrl);
        } else {
          console.warn('Inicio de sesión fallido: Usuario o contraseña incorrectos');
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un problema al iniciar sesión. Inténtalo de nuevo más tarde.';
        console.error('Error durante el login:', error);
      },
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
