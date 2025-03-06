import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Profile</h2>
      <div class="profile-content">
        <div class="profile-card">
          <div class="profile-header">
            <i class="material-icons profile-icon">account_circle</i>
            <h3>User Profile</h3>
          </div>
          <div class="profile-details">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe&#64;example.com</p>
            <p><strong>Role:</strong> Administrator</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .profile-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .profile-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 24px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      
      h3 {
        margin: 0;
        color: #2c3e50;
      }
    }

    .profile-icon {
      font-size: 48px;
      margin-right: 16px;
      color: #2c3e50;
    }

    .profile-details {
      p {
        margin: 8px 0;
        color: #666;
        
        strong {
          color: #2c3e50;
        }
      }
    }
  `]
})
export class ProfileComponent {} 