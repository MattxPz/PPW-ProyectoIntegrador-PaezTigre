import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../components/services/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = signal(true);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  toggleMode() {
    this.isLogin.update((v) => !v);
    this.errorMessage.set(null);
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const action$ = this.isLogin()
      ? this.authService.login(email!, password!)
      : this.authService.register(email!, password!);

    action$.subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Error de Firebase:', err);
        
        let msg = 'Ocurrió un error inesperado.';
        
        // Mapeo de errores de Firebase Auth
        switch (err.code) {
          case 'auth/email-already-in-use':
            msg = 'El correo ya está registrado.';
            break;
          case 'auth/weak-password':
            msg = 'La contraseña es muy débil (mínimo 6 caracteres).';
            break;
          case 'auth/invalid-email':
            msg = 'El formato del correo no es válido.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            msg = 'Correo o contraseña incorrectos.';
            break;
          case 'permission-denied':
            msg = 'Error de permisos en Firestore. Revisa las reglas.';
            break;
        }

        this.errorMessage.set(msg);
        this.isLoading.set(false);
      },
    });
  }

  loginWithGoogle() {
    this.isLoading.set(true);
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al iniciar sesión con Google');
        this.isLoading.set(false);
      }
    });
  }
}