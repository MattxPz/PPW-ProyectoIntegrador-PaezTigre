import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UpperCasePipe, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/services/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe, AsyncPipe],
  templateUrl: './app-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  authService = inject(AuthService);
  private router = inject(Router);

  brand = signal('DevPortfolio');

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}