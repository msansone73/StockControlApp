import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar-nav">
      <div class="logo-container">
        <h1 class="app-title">My App</h1>
      </div>
      
      <ul class="nav-list">
        @for (item of menuItems(); track item.route) {
          <li class="nav-item">
            <a 
              [routerLink]="[item.route]"
              routerLinkActive="active"
              class="nav-link">
              <i class="material-icons">{{item.icon}}</i>
              <span>{{item.label}}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar-nav {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .logo-container {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .app-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 4px 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      color: white;
      text-decoration: none;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.2);
      }

      i {
        margin-right: 12px;
      }
    }

    .material-icons {
      font-size: 20px;
    }
  `]
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help', label: 'Help', route: '/help' },
  ]);
} 