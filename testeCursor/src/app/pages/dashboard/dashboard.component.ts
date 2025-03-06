import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Statistics</h3>
          <p>Your daily statistics and metrics</p>
        </div>
        <div class="dashboard-card">
          <h3>Recent Activity</h3>
          <p>View your recent activities</p>
        </div>
        <div class="dashboard-card">
          <h3>Tasks</h3>
          <p>Manage your pending tasks</p>
        </div>
        <div class="dashboard-card">
          <h3>Analytics</h3>
          <p>View detailed analytics</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .dashboard-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      h3 {
        margin: 0 0 10px 0;
        color: #2c3e50;
      }

      p {
        margin: 0;
        color: #666;
      }
    }
  `]
})
export class DashboardComponent {} 