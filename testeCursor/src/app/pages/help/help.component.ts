import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="help-container">
      <h2>Help Center</h2>
      <div class="help-content">
        <div class="help-section">
          <h3>Frequently Asked Questions</h3>
          <div class="faq-list">
            <div class="faq-item">
              <h4>How do I change my password?</h4>
              <p>Go to Settings > Account Settings > Security to change your password.</p>
            </div>
            <div class="faq-item">
              <h4>How do I update my profile?</h4>
              <p>Navigate to the Profile page and click on the Edit button to update your information.</p>
            </div>
            <div class="faq-item">
              <h4>How do I contact support?</h4>
              <p>You can reach our support team at support&#64;example.com</p>
            </div>
          </div>
        </div>

        <div class="help-section">
          <h3>Need More Help?</h3>
          <div class="support-options">
            <button class="support-button">
              <i class="material-icons">chat</i>
              Live Chat
            </button>
            <button class="support-button">
              <i class="material-icons">email</i>
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .help-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .help-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 24px;
      margin-bottom: 20px;

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
      }
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .faq-item {
      h4 {
        color: #2c3e50;
        margin: 0 0 8px 0;
      }

      p {
        color: #666;
        margin: 0;
      }
    }

    .support-options {
      display: flex;
      gap: 16px;
    }

    .support-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background: #2c3e50;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background: #34495e;
      }

      i {
        font-size: 20px;
      }
    }
  `]
})
export class HelpComponent {} 