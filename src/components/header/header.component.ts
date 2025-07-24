import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <a routerLink="/" class="logo">
              <h1 class="logo-text">LOREM IPSUM</h1>
            </a>
            <div class="header-actions" *ngIf="authService.user$ | async as user">
              <a routerLink="/admin" class="admin-link">Admin Panel</a>
              <button class="btn-logout" (click)="authService.logout()">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      border-bottom: 1px solid #e5e5e5;
      padding: 1rem 0;
      position: relative;
    }

    .logo {
      text-decoration: none;
      display: inline-block;
    }

    .logo-text {
      font-family: 'Times New Roman', serif;
      font-size: 1.8rem;
      font-weight: 300;
      letter-spacing: 2px;
      color: #2c2c2c;
      margin: 0;
      text-transform: uppercase;
    }

    .header-actions {
      position: absolute;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .admin-link {
      color: #8b6914;
      text-decoration: none;
      font-family: 'Times New Roman', serif;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .admin-link:hover {
      color: #a67c00;
    }

    .btn-logout {
      background: none;
      border: 1px solid #8b6914;
      color: #8b6914;
      padding: 0.3rem 0.8rem;
      font-family: 'Times New Roman', serif;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 2px;
    }

    .btn-logout:hover {
      background: #8b6914;
      color: white;
    }

    @media (max-width: 768px) {
      .header-actions {
        position: static;
        transform: none;
        justify-content: center;
        margin-top: 1rem;
      }

      .logo-text {
        font-size: 1.4rem;
        text-align: center;
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
}