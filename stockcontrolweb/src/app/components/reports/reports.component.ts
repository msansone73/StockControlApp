import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
    <div class="card">
      <h2>Reports</h2>
      <div class="reports-grid">
        <div class="report-card">
          <h3>Sales Report</h3>
          <p>View detailed sales analytics and trends</p>
          <button class="btn btn-primary">
            <i class="fas fa-chart-bar"></i> Generate Report
          </button>
        </div>
        <div class="report-card">
          <h3>Inventory Report</h3>
          <p>Track stock levels and inventory movements</p>
          <button class="btn btn-primary">
            <i class="fas fa-box"></i> Generate Report
          </button>
        </div>
        <div class="report-card">
          <h3>User Activity Report</h3>
          <p>Monitor user actions and system usage</p>
          <button class="btn btn-primary">
            <i class="fas fa-users"></i> Generate Report
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .report-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .report-card h3 {
      margin: 0 0 1rem;
      color: var(--text-color);
    }
    .report-card p {
      margin: 0 0 1.5rem;
      color: #666;
    }
    .report-card button {
      width: 100%;
    }
  `]
})
export class ReportsComponent {} 