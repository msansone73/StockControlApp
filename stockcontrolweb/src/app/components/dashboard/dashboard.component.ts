import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="card">
      <h2>Dashboard</h2>
      <div class="dashboard-stats">
        <div class="stat-card">
          <i class="fas fa-users"></i>
          <div class="stat-info">
            <h3>Total Users</h3>
            <p>150</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-box"></i>
          <div class="stat-info">
            <h3>Total Products</h3>
            <p>1,234</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-chart-line"></i>
          <div class="stat-info">
            <h3>Sales Today</h3>
            <p>$12,345</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .stat-card i {
      font-size: 2rem;
      color: var(--primary-color);
    }
    .stat-info h3 {
      margin: 0;
      font-size: 1rem;
      color: #666;
    }
    .stat-info p {
      margin: 0.5rem 0 0;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-color);
    }
  `]
})
export class DashboardComponent {} 