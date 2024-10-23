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
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Reiniciar el mensaje de error antes de intentar iniciar sesión

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (isLoggedIn) => {
        this.isLoading = false;
        if (isLoggedIn) {
          // Obtener la URL a la que intentaba acceder antes del login
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un problema al iniciar sesión. Inténtalo de nuevo más tarde.';
        console.error('Login error:', error);
      },
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
