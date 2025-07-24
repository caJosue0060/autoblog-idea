import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, switchMap, of, BehaviorSubject } from 'rxjs';
import { User as AppUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private messageSubject = new BehaviorSubject<{type: 'success' | 'error', message: string} | null>(null);
  public message$ = this.messageSubject.asObservable();

  user$ = user(this.auth);
  currentUser$: Observable<AppUser | null> = this.user$.pipe(
    switchMap(user => {
      if (!user) return of(null);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      return from(getDoc(userDocRef)).pipe(
        switchMap(userDoc => {
          if (userDoc.exists()) {
            return of(userDoc.data() as AppUser);
          }
          return of(null);
        })
      );
    })
  );

  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.showMessage('success', 'Login successful!');
      this.router.navigate(['/admin']);
      return true;
    } catch (error: any) {
      this.showMessage('error', error.message || 'Login failed');
      return false;
    }
  }

  async register(email: string, password: string, displayName: string): Promise<boolean> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      const userData: AppUser = {
        uid: result.user.uid,
        email: result.user.email!,
        displayName,
        role: 'admin', // First user is admin
        createdAt: new Date()
      };
      await setDoc(doc(this.firestore, `users/${result.user.uid}`), userData);
      this.showMessage('success', 'Registration successful!');
      this.router.navigate(['/admin']);
      return true;
    } catch (error: any) {
      this.showMessage('error', error.message || 'Registration failed');
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.showMessage('success', 'Logged out successfully');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.showMessage('error', 'Logout failed');
    }
  }

  private showMessage(type: 'success' | 'error', message: string): void {
    this.messageSubject.next({ type, message });
    setTimeout(() => {
      this.messageSubject.next(null);
    }, 5000);
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
}