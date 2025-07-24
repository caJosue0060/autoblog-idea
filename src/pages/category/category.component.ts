import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService } from '../../services/data.service';
import { Category, Thesis } from '../../models/interfaces';
import { Observable, combineLatest, switchMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="page-container">
      <app-header></app-header>
      
      <div class="main-container">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <app-sidebar></app-sidebar>
            </div>
            
            <div class="col-md-9">
              <main class="main-content">
                <div class="page-header" *ngIf="category$ | async as category">
                  <h1 class="page-title">{{ category.name }}</h1>
                  <p class="page-description" *ngIf="category.description">{{ category.description }}</p>
                </div>
                
                <div class="theses-section">
                  <h2 class="section-title">Key Theses</h2>
                  <div class="theses-list" *ngIf="theses$ | async as theses; else noTheses">
                    <div 
                      *ngFor="let thesis of theses; let i = index" 
                      class="thesis-item"
                    >
                      <div class="thesis-number">{{ i + 1 }}</div>
                      <div class="thesis-content">
                        <h3 class="thesis-title">
                          <a [routerLink]="['/category', categorySlug, 'thesis', thesis.slug]" class="thesis-link">
                            {{ thesis.title }}
                          </a>
                        </h3>
                        <p class="thesis-description" *ngIf="thesis.description">{{ thesis.description }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <ng-template #noTheses>
                    <div class="no-content">
                      <p>No theses available for this category yet.</p>
                    </div>
                  </ng-template>
                </div>
              </main>
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
      padding: 2rem 0;
    }

    .main-content {
      padding: 0 2rem;
    }

    .page-header {
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #8b6914;
    }

    .page-title {
      font-family: 'Times New Roman', serif;
      font-size: 2.5rem;
      font-weight: 300;
      font-style: italic;
      color: #2c2c2c;
      margin-bottom: 1rem;
      text-align: center;
    }

    .page-description {
      font-family: 'Times New Roman', serif;
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .section-title {
      font-family: 'Times New Roman', serif;
      font-size: 1.8rem;
      font-weight: 400;
      color: #8b6914;
      margin-bottom: 2rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .theses-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .thesis-item {
      display: flex;
      align-items: flex-start;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: box-shadow 0.2s;
    }

    .thesis-item:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .thesis-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #8b6914;
      color: white;
      font-family: 'Times New Roman', serif;
      font-weight: 600;
      font-size: 1.1rem;
      border-radius: 50%;
      margin-right: 1.5rem;
      flex-shrink: 0;
    }

    .thesis-content {
      flex: 1;
    }

    .thesis-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
      font-weight: 400;
    }

    .thesis-link {
      color: #2c2c2c;
      text-decoration: none;
      font-family: 'Times New Roman', serif;
      line-height: 1.4;
      transition: color 0.2s;
    }

    .thesis-link:hover {
      color: #8b6914;
      text-decoration: underline;
    }

    .thesis-description {
      font-family: 'Times New Roman', serif;
      color: #666;
      line-height: 1.5;
      margin: 0;
      font-size: 0.95rem;
    }

    .no-content {
      text-align: center;
      padding: 3rem;
      color: #666;
      font-family: 'Times New Roman', serif;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 0 1rem;
      }
      
      .page-title {
        font-size: 2rem;
      }
      
      .thesis-item {
        flex-direction: column;
        text-align: center;
      }
      
      .thesis-number {
        margin: 0 auto 1rem auto;
      }
    }
  `]
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  category$!: Observable<Category | null>;
  theses$!: Observable<Thesis[]>;
  categorySlug!: string;

  ngOnInit() {
    this.categorySlug = this.route.snapshot.params['categorySlug'];
    
    this.category$ = this.dataService.getCategories().pipe(
      map(categories => categories.find(cat => cat.slug === this.categorySlug) || null)
    );

    this.theses$ = this.category$.pipe(
      switchMap(category => {
        if (!category) return of([]);
        return this.dataService.getThesesByCategory(category.id);
      })
    );
  }
}