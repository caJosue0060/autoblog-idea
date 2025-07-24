import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService } from '../../services/data.service';
import { Category, Thesis, Citation, Note, Objection } from '../../models/interfaces';
import { Observable, combineLatest, switchMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-thesis',
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
                <div class="page-header" *ngIf="thesis$ | async as thesis">
                  <h1 class="page-title">{{ thesis.title }}</h1>
                </div>
                
                <!-- Patristic Citations Section -->
                <div class="citations-section" *ngIf="citations$ | async as citations">
                  <h2 class="section-title">Padres de la Iglesia</h2>
                  
                  <div class="citation-block" *ngFor="let citation of citations; let last = last">
                    <div class="citation-row">
                      <div class="citation-author">
                        <h3>{{ citation.author | uppercase }}</h3>
                        <p *ngIf="citation.source" class="citation-source">{{ citation.source }}</p>
                      </div>
                      
                      <div class="citation-content">
                        <div class="citation-text" [innerHTML]="formatCitationContent(citation.content, citation.id)"></div>
                        
                        <!-- Notes container -->
                        <div class="notes-container" #notesContainer></div>
                      </div>
                    </div>
                    
                    <div *ngIf="!last" class="citation-divider"></div>
                  </div>
                </div>
                
                <!-- Objections Section -->
                <div class="objections-section" *ngIf="objections$ | async as objections; else noObjections">
                  <h2 class="section-title objections-title">Objeciones</h2>
                  
                  <div class="objection-block" *ngFor="let objection of objections; let last = last">
                    <div class="objection-row">
                      <div class="objection-content">
                        <blockquote class="objection-quote">{{ objection.content }}</blockquote>
                      </div>
                      
                      <div class="objection-response">
                        <div class="response-bullet">•</div>
                        <div class="response-text">{{ objection.response }}</div>
                      </div>
                    </div>
                    
                    <div *ngIf="!last" class="objection-divider"></div>
                  </div>
                </div>
                
                <ng-template #noObjections>
                  <div class="no-objections">
                    <p><em>No objections recorded for this thesis.</em></p>
                  </div>
                </ng-template>
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
      font-size: 2.2rem;
      font-weight: 300;
      font-style: italic;
      color: #2c2c2c;
      margin: 0;
      text-align: center;
    }

    .section-title {
      font-family: 'Times New Roman', serif;
      font-size: 1.6rem;
      font-weight: 400;
      color: #8b6914;
      margin-bottom: 2rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .objections-title {
      color: #6d5a00;
      margin-top: 3rem;
    }

    /* Citations Styles */
    .citations-section {
      margin-bottom: 4rem;
    }

    .citation-block {
      margin-bottom: 2rem;
    }

    .citation-row {
      display: grid;
      grid-template-columns: 25% 75%;
      gap: 2rem;
      align-items: flex-start;
    }

    .citation-author h3 {
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      font-weight: 600;
      color: #2c2c2c;
      letter-spacing: 2px;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
    }

    .citation-source {
      font-family: 'Times New Roman', serif;
      font-size: 0.85rem;
      color: #666;
      font-style: italic;
      margin: 0;
    }

    .citation-content {
      position: relative;
    }

    .citation-text {
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      line-height: 1.5;
      color: #333;
      text-align: justify;
    }

    .citation-text em {
      font-style: italic;
      color: #8b6914;
    }

    .note-marker {
      color: #8b6914;
      font-size: 0.6em;
      vertical-align: super;
      cursor: pointer;
      transition: color 0.2s;
      padding: 0 2px;
    }

    .note-marker:hover {
      color: #a67c00;
    }

    .citation-divider {
      height: 1px;
      background: #d4b575;
      margin: 2rem 0;
      opacity: 0.7;
    }

    /* Notes Styles */
    .notes-container {
      position: relative;
    }

    .note-box {
      background: #f7f7f7;
      border: 1px solid #d4b575;
      border-radius: 4px;
      padding: 1rem;
      margin-top: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
      animation: noteSlideDown 0.3s ease-out;
    }

    .note-close {
      position: absolute;
      top: 8px;
      right: 12px;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #666;
      padding: 0;
      line-height: 1;
    }

    .note-close:hover {
      color: #333;
    }

    .note-content {
      font-family: 'Times New Roman', serif;
      font-size: 0.9rem;
      line-height: 1.4;
      color: #555;
      padding-right: 2rem;
    }

    @keyframes noteSlideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
      }
      to {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px;
      }
    }

    /* Objections Styles */
    .objections-section {
      margin-top: 3rem;
    }

    .objection-block {
      margin-bottom: 2rem;
    }

    .objection-row {
      display: grid;
      grid-template-columns: 35% 65%;
      gap: 2rem;
      align-items: flex-start;
    }

    .objection-quote {
      font-family: 'Times New Roman', serif;
      font-size: 0.95rem;
      font-style: italic;
      color: #555;
      margin: 0;
      padding-left: 0.5rem;
      border-left: 3px solid #ccc;
      line-height: 1.5;
    }

    .objection-response {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .response-bullet {
      color: #8b6914;
      font-weight: bold;
      font-size: 1.2rem;
      margin-top: -0.1rem;
    }

    .response-text {
      font-family: 'Times New Roman', serif;
      font-size: 1rem;
      line-height: 1.5;
      color: #333;
      text-align: justify;
      flex: 1;
    }

    .objection-divider {
      height: 2px;
      background: linear-gradient(to right, #ddd 0%, #ddd 48%, transparent 48%, transparent 52%, #ddd 52%, #ddd 100%);
      margin: 2rem 0;
    }

    .no-objections {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-family: 'Times New Roman', serif;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 0 1rem;
      }
      
      .citation-row,
      .objection-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .citation-author h3 {
        text-align: center;
        margin-bottom: 1rem;
      }
      
      .page-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class ThesisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  thesis$!: Observable<Thesis | null>;
  citations$!: Observable<Citation[]>;
  objections$!: Observable<Objection[]>;
  
  private openNotes: Set<string> = new Set();

  ngOnInit() {
    const categorySlug = this.route.snapshot.params['categorySlug'];
    const thesisSlug = this.route.snapshot.params['thesisSlug'];

    this.thesis$ = this.dataService.getTheses().pipe(
      map(theses => theses.find(thesis => thesis.slug === thesisSlug) || null)
    );

    this.citations$ = this.thesis$.pipe(
      switchMap(thesis => {
        if (!thesis) return of([]);
        return this.dataService.getCitationsByThesis(thesis.id);
      })
    );

    this.objections$ = this.thesis$.pipe(
      switchMap(thesis => {
        if (!thesis) return of([]);
        return this.dataService.getObjectionsByThesis(thesis.id);
      })
    );
  }

  formatCitationContent(content: string, citationId: string): string {
    // Add note markers to content (simplified implementation)
    // In a real application, you would parse for note positions
    return content.replace(/\[note:(\d+)\]/g, (match, noteId) => {
      return `<span class="note-marker" onclick="this.toggleNote('${citationId}', '${noteId}')">⁺</span>`;
    });
  }

  toggleNote(citationId: string, noteId: string): void {
    const noteKey = `${citationId}-${noteId}`;
    
    if (this.openNotes.has(noteKey)) {
      this.openNotes.delete(noteKey);
      this.closeNote(noteKey);
    } else {
      this.openNotes.add(noteKey);
      this.showNote(citationId, noteId);
    }
  }

  private showNote(citationId: string, noteId: string): void {
    // In a real implementation, you would fetch the actual note content
    // This is a simplified version
    const noteContent = "Sample note content for demonstration purposes.";
    
    const noteHtml = `
      <div class="note-box" id="note-${citationId}-${noteId}">
        <button class="note-close" onclick="this.closeNote('${citationId}-${noteId}')">&times;</button>
        <div class="note-content">${noteContent}</div>
      </div>
    `;
    
    // Find the citation content container and append the note
    // This would need proper DOM manipulation in a real implementation
  }

  private closeNote(noteKey: string): void {
    const noteElement = document.getElementById(`note-${noteKey}`);
    if (noteElement) {
      noteElement.remove();
    }
  }
}