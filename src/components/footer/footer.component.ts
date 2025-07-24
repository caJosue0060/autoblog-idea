import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="footer-content">
              <p class="footer-text">
                Questions? <a routerLink="/contact" class="footer-link">Contact us.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: white;
      border-top: 1px solid #e5e5e5;
      padding: 2rem 0;
      margin-top: auto;
    }

    .footer-content {
      text-align: right;
    }

    .footer-text {
      font-family: 'Times New Roman', serif;
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    .footer-link {
      color: #8b6914;
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-link:hover {
      color: #a67c00;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .footer-content {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent { }