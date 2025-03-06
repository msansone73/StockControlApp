import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-container">
      <h2>Settings</h2>
      <div class="settings-content">
        <div class="settings-section">
          <h3>
            <i class="material-icons">person</i>
            Account Settings
          </h3>
          <div class="settings-options">
            <div class="setting-item">
              <span>Profile Visibility</span>
              <button class="setting-button">Public</button>
            </div>
            <div class="setting-item">
              <span>Email Notifications</span>
              <button class="setting-button">Enabled</button>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3>
            <i class="material-icons">palette</i>
            Appearance
          </h3>
          <div class="settings-options">
            <div class="setting-item">
              <span>Theme</span>
              <button class="setting-button">Light</button>
            </div>
            <div class="setting-item">
              <span>Font Size</span>
              <button class="setting-button">Medium</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .settings-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .settings-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 24px;
      margin-bottom: 20px;

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
        display: flex;
        align-items: center;
        
        i {
          margin-right: 10px;
        }
      }
    }

    .settings-options {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #eee;

      span {
        color: #666;
      }
    }

    .setting-button {
      padding: 8px 16px;
      border: 1px solid #2c3e50;
      border-radius: 4px;
      background: transparent;
      color: #2c3e50;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #2c3e50;
        color: white;
      }
    }
  `]
})
export class SettingsComponent {} 