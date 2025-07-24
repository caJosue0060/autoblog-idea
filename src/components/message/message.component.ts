import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Observable, merge } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="message$ | async as message" 
      class="alert-container"
      [class.alert-success]="message.type === 'success'"
      [class.alert-error]="message.type === 'error'"
    >
      <div class="alert-content">
        <span class="alert-text">{{ message.message }}</span>
        <button class="alert-close" (click)="closeMessage()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .alert-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
      min-width: 300px;
      max-width: 500px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    }

    .alert-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .alert-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .alert-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
    }

    .alert-text {
      font-family: 'Times New Roman', serif;
      font-size: 0.9rem;
      flex: 1;
    }

    .alert-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      padding: 0;
      margin-left: 1rem;
    }

    .alert-close:hover {
      opacity: 1;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .alert-container {
        right: 10px;
        left: 10px;
        min-width: auto;
      }
    }
  `]
})
export class MessageComponent implements OnInit {
  private authService = inject(AuthService);
  private dataService = inject(DataService);

  message$!: Observable<{type: 'success' | 'error', message: string} | null>;

  ngOnInit() {
    this.message$ = merge(
      this.authService.message$,
      this.dataService.message$
    );
  }

  closeMessage() {
    this.authService.clearMessage();
    this.dataService.clearMessage();
  }
}