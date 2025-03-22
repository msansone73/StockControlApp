import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="card">
      <h2>About Stock Control</h2>
      <div class="about-content">
        <div class="about-section">
          <h3>Our Mission</h3>
          <p>
            Stock Control is a comprehensive inventory management system designed to help businesses
            efficiently manage their stock levels, track inventory movements, and make data-driven
            decisions.
          </p>
        </div>
        <div class="about-section">
          <h3>Features</h3>
          <ul>
            <li>Real-time inventory tracking</li>
            <li>User management system</li>
            <li>Detailed reporting and analytics</li>
            <li>Stock level alerts</li>
            <li>Export functionality</li>
          </ul>
        </div>
        <div class="about-section">
          <h3>Contact</h3>
          <p>
            For support or inquiries, please contact us at:<br>
            <a href="mailto:support&#64;stockcontrol.com">support&#64;stockcontrol.com</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-content {
      max-width: 800px;
      margin: 2rem auto 0;
    }
    .about-section {
      margin-bottom: 2rem;
    }
    .about-section h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .about-section p {
      line-height: 1.6;
      color: #666;
    }
    .about-section ul {
      list-style: none;
      padding: 0;
    }
    .about-section li {
      padding: 0.5rem 0;
      color: #666;
      display: flex;
      align-items: center;
    }
    .about-section li:before {
      content: "•";
      color: var(--primary-color);
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .about-section a {
      color: var(--primary-color);
      text-decoration: none;
    }
    .about-section a:hover {
      text-decoration: underline;
    }
  `]
})
export class AboutComponent {} 