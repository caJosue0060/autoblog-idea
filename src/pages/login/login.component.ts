import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  template: `
    <div class="page-container">
      <app-header></app-header>
      
      <div class="main-container">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
              <div class="login-card">
                <h1 class="login-title">Administrator Access</h1>
                
                <div class="login-tabs">
                  <button 
                    type="button" 
                    class="tab-button"
                    [class.active]="activeTab === 'login'"
                    (click)="setActiveTab('login')"
                  >
                    Login
                  </button>
                  <button 
                    type="button" 
                    class="tab-button"
                    [class.active]="activeTab === 'register'"
                    (click)="setActiveTab('register')"
                  >
                    Register
                  </button>
                </div>
                
                <!-- Login Form -->
                <form 
                  *ngIf="activeTab === 'login'" 
                  [formGroup]="loginForm" 
                  (ngSubmit)="onLogin()"
                  class="auth-form"
                >
                  <div class="form-group">
                    <label for="loginEmail">Email Address</label>
                    <input 
                      type="email" 
                      id="loginEmail"
                      formControlName="email"
                      class="form-control"
                      [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                    >
                      <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                      <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input 
                      type="password" 
                      id="loginPassword"
                      formControlName="password"
                      class="form-control"
                      [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                    >
                      <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
                      <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-block"
                    [disabled]="loginForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Signing In...' : 'Sign In' }}
                  </button>
                </form>
                
                <!-- Register Form -->
                <form 
                  *ngIf="activeTab === 'register'" 
                  [formGroup]="registerForm" 
                  (ngSubmit)="onRegister()"
                  class="auth-form"
                >
                  <div class="form-group">
                    <label for="registerName">Display Name</label>
                    <input 
                      type="text" 
                      id="registerName"
                      formControlName="displayName"
                      class="form-control"
                      [class.is-invalid]="registerForm.get('displayName')?.invalid && registerForm.get('displayName')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="registerForm.get('displayName')?.invalid && registerForm.get('displayName')?.touched"
                    >
                      <span *ngIf="registerForm.get('displayName')?.errors?.['required']">Display name is required</span>
                      <span *ngIf="registerForm.get('displayName')?.errors?.['minlength']">Name must be at least 2 characters</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="registerEmail">Email Address</label>
                    <input 
                      type="email" 
                      id="registerEmail"
                      formControlName="email"
                      class="form-control"
                      [class.is-invalid]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                    >
                      <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
                      <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <input 
                      type="password" 
                      id="registerPassword"
                      formControlName="password"
                      class="form-control"
                      [class.is-invalid]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                    >
                      <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
                      <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword"
                      formControlName="confirmPassword"
                      class="form-control"
                      [class.is-invalid]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
                    />
                    <div 
                      class="invalid-feedback" 
                      *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
                    >
                      <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                      <span *ngIf="registerForm.errors?.['passwordMismatch']">Passwords do not match</span>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-block"
                    [disabled]="registerForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-container {
      flex: 1;
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .login-title {
      font-family: 'Times New Roman', serif;
      font-size: 1.8rem;
      font-weight: 300;
      color: #2c2c2c;
      text-align: center;
      padding: 2rem 2rem 0;
      margin: 0 0 2rem 0;
    }

    .login-tabs {
      display: flex;
      border-bottom: 1px solid #e5e5e5;
    }

    .tab-button {
      flex: 1;
      padding: 1rem;
      background: #f8f9fa;
      border: none;
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab-button.active {
      background: white;
      color: #8b6914;
      border-bottom: 2px solid #8b6914;
    }

    .tab-button:hover:not(.active) {
      background: #e9ecef;
    }

    .auth-form {
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-family: 'Times New Roman', serif;
      font-size: 0.95rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #8b6914;
      box-shadow: 0 0 0 0.2rem rgba(139, 105, 20, 0.25);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .form-control.is-invalid:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    .invalid-feedback {
      display: block;
      font-family: 'Times New Roman', serif;
      font-size: 0.85rem;
      color: #dc3545;
      margin-top: 0.25rem;
    }

    .btn {
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .btn-primary {
      background: #8b6914;
      color: white;
      border: 1px solid #8b6914;
    }

    .btn-primary:hover:not(:disabled) {
      background: #a67c00;
      border-color: #a67c00;
    }

    .btn-primary:disabled {
      background: #ccc;
      border-color: #ccc;
      cursor: not-allowed;
    }

    .btn-block {
      width: 100%;
    }

    @media (max-width: 768px) {
      .main-container {
        padding: 2rem 1rem;
      }
      
      .login-title {
        font-size: 1.5rem;
        padding: 1.5rem 1rem 0;
      }
      
      .auth-form {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  activeTab: 'login' | 'register' = 'login';
  isLoading = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: FormGroup = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  async onLogin() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.isLoading = false;
    }
  }

  async onRegister() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password, displayName } = this.registerForm.value;
      await this.authService.register(email, password, displayName);
      this.isLoading = false;
    }
  }
}