import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
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
                <div class="content-grid">
                  <div class="content-column">
                    <h2 class="column-title">WHAT</h2>
                    <div class="column-content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium.</p>
                      
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                    </div>
                  </div>
                  
                  <div class="content-column">
                    <h2 class="column-title">WHY</h2>
                    <div class="column-content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                      
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                    </div>
                  </div>
                  
                  <div class="content-column">
                    <h2 class="column-title">WHO</h2>
                    <div class="column-content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium.:</p>
                      
                      <h4>Ipsum</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium.</p>
                      
                      <h4>Lorem</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                      
                      <h4>Lorem</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                    </div>
                  </div>
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

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }

    .content-column {
      background: white;
      padding: 2rem;
      border: 1px solid #e5e5e5;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .column-title {
      font-family: 'Times New Roman', serif;
      font-size: 1.4rem;
      font-weight: 300;
      letter-spacing: 2px;
      color: #8b6914;
      text-align: center;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      border-bottom: 2px solid #8b6914;
      padding-bottom: 0.5rem;
    }

    .column-content {
      font-family: 'Times New Roman', serif;
      line-height: 1.6;
      color: #333;
    }

    .column-content p {
      margin-bottom: 1rem;
      text-align: justify;
    }

    .column-content h4 {
      font-family: 'Times New Roman', serif;
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c2c2c;
      margin: 1.5rem 0 0.5rem 0;
    }

    .content-link {
      color: #8b6914;
      text-decoration: underline;
      transition: color 0.2s;
    }

    .content-link:hover {
      color: #a67c00;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .main-content {
        padding: 0 1rem;
      }
      
      .content-column {
        padding: 1.5rem;
      }
      
      .column-title {
        font-size: 1.2rem;
      }
    }
  `]
})
export class HomeComponent { }