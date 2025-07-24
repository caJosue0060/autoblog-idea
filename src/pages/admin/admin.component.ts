import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, combineLatest, Observable } from 'rxjs';
import { switchMap, map, tap, take } from 'rxjs/operators';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Category, Thesis, Citation, Objection } from '../../models/interfaces';
import { SlugPipe } from '../../pipes/slug.pipe';

interface CategoryNode extends Category {
  theses: Array<ThesisNode>;
}
interface ThesisNode extends Thesis {
  citations: Citation[];
  objections: Objection[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    SlugPipe
  ],
  template: `
    <div class="page-container">
      <app-header></app-header>

      <div class="main-container">
        <div class="container">

          <div class="admin-header">
            <h1 class="admin-title">Content Management (Jerárquico)</h1>
            <div class="welcome-text" *ngIf="authService.currentUser$ | async as user">
              Welcome, {{ user.displayName || user.email }}
            </div>
          </div>

          <!-- ALERTA -->
          <div *ngIf="dataService.message$ | async as msg"
               class="alert"
               [ngClass]="{
                 'alert-success': msg.type === 'success',
                 'alert-danger': msg.type === 'error'
               }" style="margin:1rem;">
            {{ msg.message }}
          </div>

          <!-- FORMULARIO CATEGORÍA -->
          <div class="section-header">
            <h2>Categories</h2>
            <button class="btn btn-primary" (click)="showCategoryForm = !showCategoryForm">
              {{ showCategoryForm ? 'Cancel' : 'Add Category' }}
            </button>
          </div>
          <div *ngIf="showCategoryForm" class="form-container">
            <form [formGroup]="categoryForm" (ngSubmit)="onSubmitCategory()">
              <div class="form-row">
                <div class="form-group">
                  <label>Name</label>
                  <input formControlName="name" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Order</label>
                  <input type="number" formControlName="order" class="form-control" />
                </div>
              </div>
              <div class="form-actions">
                <button class="btn btn-success" [disabled]="categoryForm.invalid">
                  {{ editingCategory ? 'Update' : 'Add' }} Category
                </button>
              </div>
            </form>
          </div>

          <!-- LISTADO JERÁRQUICO -->
          <div *ngFor="let cat of categoryTree$ | async" class="category-node">
            <h3>{{ cat.name }}</h3>

            <!-- FORMULARIO Tesis -->
            <button class="btn btn-sm btn-secondary"
                    (click)="toggleThesisForm(cat.id)">
              {{ showThesisForm[cat.id] ? 'Cancel' : 'Add Thesis' }}
            </button>
            <div *ngIf="showThesisForm[cat.id]" class="form-container">
              <form [formGroup]="thesisForms[cat.id]" (ngSubmit)="onSubmitThesis(cat.id)">
                <div class="form-row">
                  <div class="form-group">
                    <label>Title</label>
                    <input formControlName="title" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Order</label>
                    <input type="number" formControlName="order" class="form-control" />
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn btn-success" [disabled]="thesisForms[cat.id].invalid">
                    Add Thesis
                  </button>
                </div>
              </form>
            </div>

            <!-- Tesis dentro de esta categoría -->
            <ul class="list-group mb-4">
              <li class="list-group-item" *ngFor="let th of cat.theses">
                <strong>{{ th.title }}</strong>
                <button class="btn btn-sm btn-outline-danger float-end"
                        (click)="deleteThesis(th.id)">
                  Delete
                </button>

                <!-- CITAS -->
                <div class="ms-3 mt-2">
                  <em>Citations:</em>
                  <ul>
                    <li *ngFor="let cit of th.citations">
                      {{ cit.author }}: {{ cit.content }}
                    </li>
                  </ul>
                </div>

                <!-- OBJECIONES -->
                <div class="ms-3 mt-2">
                  <em>Objections:</em>
                  <ul>
                    <li *ngFor="let obj of th.objections">
                      {{ obj.content }} → {{ obj.response }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-container { display:flex; flex-direction:column; min-height:100vh; }
    .main-container { flex:1; padding:2rem; background:#f8f9fa; }
    .admin-header { text-align:center; margin-bottom:2rem; }
    .admin-title { font-size:2rem; }
    .section-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; }
    .form-container { background:#fff; padding:1rem; margin-bottom:1rem; border:1px solid #ddd; }
    .form-row { display:flex; gap:1rem; }
    .form-group { flex:1; }
    .form-actions { margin-top:1rem; }
    .category-node { background:#fff; padding:1rem; margin-bottom:1rem; border:1px solid #ccc; }
    .list-group-item { margin-bottom:.5rem; }
    .ms-3 { margin-left:1rem !important; }
    .mt-2 { margin-top:.5rem !important; }
  `]
})
export class AdminComponent implements OnInit {
  public dataService = inject(DataService);
  public authService = inject(AuthService);
  private fb = inject(FormBuilder);

  /** UI Flags */
  showCategoryForm: boolean = false;
  editingCategory: Category | null = null;

  showThesisForm: { [catId: string]: boolean } = {};

  /** Data stream */
  categoryTree$!: Observable<CategoryNode[]>;

  /** Formularios */
  categoryForm: FormGroup;
  thesisForms: { [catId: string]: FormGroup } = {};

  constructor() {
    this.categoryForm = this.fb.group({
      name:   ['', Validators.required],
      order:  [0,  Validators.required]
    });
  }

  ngOnInit() {
    this.buildCategoryTree();
  }

  /** Construye el observable anidado categorías → tesis → citas/objeciones */
  private buildCategoryTree() {
    this.categoryTree$ = this.dataService.getCategories().pipe(
      switchMap(cats => {
        if (!cats.length) return of([] as CategoryNode[]);
        const enriched$ = cats.map(cat =>
          this.dataService.getThesesByCategory(cat.id).pipe(
            switchMap(theses => {
              if (!theses.length) {
                return of({ ...cat, theses: [] } as CategoryNode);
              }
              const thWithKids$ = theses.map(th =>
                combineLatest([
                  of(th),
                  this.dataService.getCitationsByThesis(th.id),
                  this.dataService.getObjectionsByThesis(th.id)
                ]).pipe(
                  map(([t, citations, objections]) => ({
                    ...t,
                    citations,
                    objections
                  } as ThesisNode))
                )
              );
              return combineLatest(thWithKids$).pipe(
                map(thArr => ({ ...cat, theses: thArr } as CategoryNode))
              );
            })
          )
        );
        return combineLatest(enriched$);
      }),
      tap(tree => {
        // crear un formGroup por categoría para añadir tesis
        tree.forEach(cat => {
          if (!this.thesisForms[cat.id]) {
            this.thesisForms[cat.id] = this.fb.group({
              title: ['', Validators.required],
              order: [0, Validators.required]
            });
            this.showThesisForm[cat.id] = false;
          }
        });
      })
    );
  }

  /** Añade o actualiza categoría */
  async onSubmitCategory() {
  if (this.categoryForm.invalid) {
    console.warn('Formulario inválido');
    return;
  }

  const { name, order } = this.categoryForm.value;
  const data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'> = {
    name,
    slug: this.generateSlug(name),
    description: '',
    order
  };

  console.log('Enviando categoría:', data);

  try {
    if (this.editingCategory) {
      console.log('Actualizando categoría');
      await this.dataService.updateCategory(this.editingCategory.id, data);
    } else {
      console.log('Agregando categoría');
      await this.dataService.addCategory(data);
    }

    // Reset y reconstrucción del árbol
    this.categoryForm.reset({ name: '', order: 0 });
    this.showCategoryForm = false;
    this.editingCategory = null;
    this.buildCategoryTree();
  } catch (error) {
    console.error('Error al enviar categoría', error);
  }
}


  /** Alterna el form de tesis dentro de una categoría */
  toggleThesisForm(catId: string) {
    this.showThesisForm[catId] = !this.showThesisForm[catId];
  }

  /** Crea una tesis dentro de una categoría */
  async onSubmitThesis(catId: string) {
    const f = this.thesisForms[catId].value;
    const data: Omit<Thesis, 'id' | 'createdAt' | 'updatedAt'> = {
      title: f.title,
      slug: this.generateSlug(f.title),
      description: '',
      order: f.order,
      categoryId: catId
    };
    await this.dataService.addThesis(data);
    this.thesisForms[catId].reset({ title: '', order: 0 });
    this.showThesisForm[catId] = false;
    // reconstruir árbol para reflejar cambios
    this.buildCategoryTree();
  }

  /** Elimina una tesis */
  async deleteThesis(thesisId: string) {
    if (!confirm('Delete this thesis?')) return;
    await this.dataService.deleteThesis(thesisId);
    this.buildCategoryTree();
  }

  private slugify(text: string): string {
    return text.toLowerCase().trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // alias
  private generateSlug = this.slugify;
}
