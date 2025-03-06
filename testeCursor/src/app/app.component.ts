import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="app-container">
      <app-sidebar class="sidebar"></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }

    .app-container {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .sidebar {
      width: 250px;
      height: 100%;
      background-color: #2c3e50;
      color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: #f8f9fa;
    }
  `]
})
export class AppComponent {} 