import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Category, Thesis, NavigationItem } from '../../models/interfaces';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li 
            *ngFor="let item of navigationItems$ | async" 
            class="nav-item"
            [class.expanded]="item.expanded"
          >
            <a 
              [routerLink]="'/category/' + item.slug"
              class="nav-link"
              (click)="toggleCategory(item)"
            >
              <span class="nav-text">{{ item.name | uppercase }}</span>
              <span class="nav-icon" *ngIf="item.children && item.children.length">
                {{ item.expanded ? '−' : '+' }}
              </span>
            </a>
            <ul *ngIf="item.children && item.expanded" class="sub-nav-list">
              <li *ngFor="let child of item.children" class="sub-nav-item">
                <a 
                  [routerLink]="'/category/' + item.slug + '/thesis/' + child.slug"
                  class="sub-nav-link"
                >
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      background: white;
      border-right: 1px solid #e5e5e5;
      height: calc(100vh - 100px);
      overflow-y: auto;
      position: sticky;
      top: 100px;
    }

    .sidebar-nav {
      padding: 2rem 0;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      border-bottom: 1px solid #f0f0f0;
    }

    .nav-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      color: #2c2c2c;
      text-decoration: none;
      font-family: 'Times New Roman', serif;
      font-size: 0.95rem;
      letter-spacing: 1px;
      transition: background-color 0.2s;
    }

    .nav-link:hover {
      background: #f8f8f8;
      color: #8b6914;
    }

    .nav-text {
      flex: 1;
    }

    .nav-icon {
      font-weight: bold;
      font-size: 1.2rem;
      color: #8b6914;
      min-width: 20px;
      text-align: center;
    }

    .sub-nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      background: #fafafa;
      border-top: 1px solid #e5e5e5;
    }

    .sub-nav-item {
      border-bottom: 1px solid #f0f0f0;
    }

    .sub-nav-item:last-child {
      border-bottom: none;
    }

    .sub-nav-link {
      display: block;
      padding: 0.8rem 2rem;
      color: #555;
      text-decoration: none;
      font-family: 'Times New Roman', serif;
      font-size: 0.9rem;
      transition: background-color 0.2s;
    }

    .sub-nav-link:hover {
      background: #f0f0f0;
      color: #8b6914;
    }

    .sub-nav-link.active {
      background: #8b6914;
      color: white;
    }

    @media (max-width: 768px) {
      .sidebar {
        height: auto;
        position: relative;
        top: 0;
      }
      
      .nav-link {
        padding: 0.8rem 1rem;
        font-size: 0.85rem;
      }
      
      .sub-nav-link {
        padding: 0.6rem 1.5rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);

  navigationItems$!: Observable<NavigationItem[]>;
  expandedCategories: Set<string> = new Set();

  ngOnInit() {
    this.navigationItems$ = combineLatest([
      this.dataService.getCategories(),
      this.dataService.getTheses()
    ]).pipe(
      map(([categories, theses]) => {
        return categories.map(category => {
          const categoryTheses = theses
            .filter(thesis => thesis.categoryId === category.id)
            .map(thesis => ({
              name: thesis.title,
              slug: thesis.slug
            }));

          return {
            name: category.name,
            slug: category.slug,
            expanded: this.expandedCategories.has(category.id),
            children: categoryTheses
          };
        });
      })
    );
  }

  toggleCategory(item: NavigationItem) {
    const category = item.name;
    if (this.expandedCategories.has(category)) {
      this.expandedCategories.delete(category);
    } else {
      this.expandedCategories.add(category);
    }
    
    // Trigger update
    this.navigationItems$ = combineLatest([
      this.dataService.getCategories(),
      this.dataService.getTheses()
    ]).pipe(
      map(([categories, theses]) => {
        return categories.map(cat => {
          const categoryTheses = theses
            .filter(thesis => thesis.categoryId === cat.id)
            .map(thesis => ({
              name: thesis.title,
              slug: thesis.slug
            }));

          return {
            name: cat.name,
            slug: cat.slug,
            expanded: this.expandedCategories.has(cat.name),
            children: categoryTheses
          };
        });
      })
    );
  }
}