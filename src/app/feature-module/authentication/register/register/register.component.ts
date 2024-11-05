import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/core/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'; // Importa Subject
import { takeUntil } from 'rxjs/operators'; // Importa takeUntil


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordStrength: string = '';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') // Updated pattern for email validation
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister(event?: Event): void {
    event?.preventDefault(); // Prevents the default behavior of the form submission


    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const { name, email, password } = this.registerForm.value;

      // Subscription to registration observable
      this.authService.register(name, email, password)
        .pipe(takeUntil(this.destroy$)) // Avoids memory leaks
        .subscribe(
          (success) => {
            this.isLoading = false;
            if (success) {
              this.successMessage = '¡Registro exitoso! Iniciando sesión...';
              
              // Automatically logs in user after successful registration
              this.authService.login(email, password)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  () => this.router.navigate(['/home']),
                  (error) => {
                    this.errorMessage = 'Error al iniciar sesión. Por favor, intenta iniciar sesión manualmente.';
                    console.error('Error en el inicio de sesión:', error);
                  }
                );
            } else {
              this.errorMessage = 'Falló el registro. Por favor, intenta de nuevo.';
            }
          },
          (error) => {
            console.error('Error en el registro:', error);
            this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
            this.isLoading = false;
          }
        );
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

   // Toggles password visibility based on the field name
   togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    field === 'password'
      ? (this.showPassword = !this.showPassword)
      : (this.showConfirmPassword = !this.showConfirmPassword);
  }

  // Validates all form fields to display errors if touched
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

   // Checks the strength of the entered password
   checkPasswordStrength(): void {
    const password = this.registerForm.get('password')?.value || '';
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      this.passwordStrength = 'Débil';
    } else if (password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)) {
      this.passwordStrength = 'Fuerte';
    } else {
      this.passwordStrength = 'Media';
    }
  }


  
   // Returns CSS class based on password strength
   getPasswordStrengthClass(): string {
    switch (this.passwordStrength) {
      case 'Fuerte':
        return 'text-success';
      case 'Media':
        return 'text-warning';
      default:
        return 'text-danger';
    }
  }

   // Lifecycle hook for handling component destruction and cleaning up subscriptions
   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
