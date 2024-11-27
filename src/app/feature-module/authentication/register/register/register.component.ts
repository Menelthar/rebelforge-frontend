import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false; // Indicador de carga
  errorMessage: string = ''; // Mensaje de error para mostrar en el formulario

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister(event?: Event): void {
    event?.preventDefault(); // Previene la acción predeterminada del enlace si se recibe el evento

    if (this.registerForm.valid) {
      this.isLoading = true; // Mostrar el estado de carga
      this.errorMessage = ''; // Limpiar mensaje de error
      const { name, email, password } = this.registerForm.value;

      this.authService.register(name, email, password).subscribe(
        (success) => {
          this.isLoading = false; // Ocultar el estado de carga una vez completado
          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Failed to register. Please try again.';
          }
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
          this.isLoading = false; // Asegurarse de ocultar el estado de carga en caso de error
        }
      );
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

  // Método para marcar todos los campos del formulario como tocados si el formulario es inválido
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
