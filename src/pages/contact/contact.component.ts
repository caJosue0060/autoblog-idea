import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <div class="page-container">
      <app-header></app-header>
      
      <div class="main-container">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
              <main class="contact-content">
                <h1 class="page-title">Contact Us</h1>
                
                <div class="contact-info">
                  <div class="contact-section">
                    <h3>Get in Touch</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium..</p>
                  </div>
                  
                  <div class="contact-methods">
                    <div class="contact-method">
                      <h4>Email</h4>
                      <a href="mailto:info&#64;churchfathers.org" class="contact-link">info&#64;churchfathers.org</a>
                    </div>
                    
                    <div class="contact-method">
                      <h4>Follow Us</h4>
                      <div class="social-links">
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Twitter</a>
                        <a href="#" class="social-link">Instagram</a>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mission-statement">
                    <h4>Our Mission</h4>
                    <p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis massa, sollicitudin vitae sagittis ac, suscipit non magna. Vestibulum facilisis fermentum lorem, ac porta diam venenatis ut. Suspendisse blandit libero sagittis nunc vehicula hendrerit sit amet eget dui. Nulla id libero vel orci convallis ullamcorper quis ut purus. Nunc malesuada semper ligula ut faucibus. Aenean id lorem dictum, condimentum augue sed, consectetur enim. Aenean pulvinar non odio elementum pretium.."</em></p>
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
      padding: 4rem 0;
      background: #fafafa;
    }

    .contact-content {
      background: white;
      padding: 3rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .page-title {
      font-family: 'Times New Roman', serif;
      font-size: 2.5rem;
      font-weight: 300;
      font-style: italic;
      color: #2c2c2c;
      text-align: center;
      margin-bottom: 3rem;
      border-bottom: 2px solid #8b6914;
      padding-bottom: 1rem;
    }

    .contact-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-section h3 {
      font-family: 'Times New Roman', serif;
      font-size: 1.4rem;
      color: #8b6914;
      margin-bottom: 1rem;
    }

    .contact-section p {
      font-family: 'Times New Roman', serif;
      line-height: 1.6;
      color: #555;
      font-size: 1.1rem;
    }

    .contact-methods {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .contact-method {
      text-align: center;
      padding: 2rem;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      background: #f9f9f9;
    }

    .contact-method h4 {
      font-family: 'Times New Roman', serif;
      font-size: 1.2rem;
      color: #2c2c2c;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-link {
      font-family: 'Times New Roman', serif;
      font-size: 1.1rem;
      color: #8b6914;
      text-decoration: none;
      transition: color 0.2s;
    }

    .contact-link:hover {
      color: #a67c00;
      text-decoration: underline;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .social-link {
      font-family: 'Times New Roman', serif;
      color: #8b6914;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.2s;
    }

    .social-link:hover {
      color: #a67c00;
      text-decoration: underline;
    }

    .mission-statement {
      text-align: center;
      padding: 2rem;
      background: #f7f6f3;
      border-radius: 4px;
      border-left: 4px solid #8b6914;
    }

    .mission-statement h4 {
      font-family: 'Times New Roman', serif;
      font-size: 1.2rem;
      color: #2c2c2c;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .mission-statement p {
      font-family: 'Times New Roman', serif;
      font-size: 1.1rem;
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 768px) {
      .contact-content {
        padding: 2rem 1.5rem;
        margin: 0 1rem;
      }
      
      .page-title {
        font-size: 2rem;
      }
      
      .social-links {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class ContactComponent { }