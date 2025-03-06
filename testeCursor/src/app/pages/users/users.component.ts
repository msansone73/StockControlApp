import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <h2>Users</h2>
      <div class="users-content">
        <div class="users-header">
          <div class="search-box">
            <i class="material-icons">search</i>
            <input type="text" placeholder="Search users..." [(ngModel)]="searchTerm" (ngModelChange)="filterUsers()">
          </div>
          <button class="add-user-btn" (click)="openAddUserModal()">
            <i class="material-icons">add</i>
            Add User
          </button>
        </div>

        <div class="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of filteredUsers; track user.id) {
                <tr [class.deleting]="deletingUserId === user.id">
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>
                    <span class="status-badge" [class.active]="user.actived">
                      {{user.actived ? 'Active' : 'Inactive'}}
                    </span>
                  </td>
                  <td class="actions">
                    <button class="action-btn" (click)="editUser(user)" [disabled]="deletingUserId === user.id">
                      <i class="material-icons">edit</i>
                    </button>
                    <button class="action-btn" (click)="deleteUser(user.id)" [disabled]="deletingUserId === user.id">
                      @if (deletingUserId === user.id) {
                        <span class="spinner-small"></span>
                      } @else {
                        <i class="material-icons">delete</i>
                      }
                    </button>
                  </td>
                </tr>
              }
              @if (filteredUsers.length === 0) {
                <tr>
                  <td colspan="4" class="no-data">
                    @if (isLoading) {
                      <div class="loading-indicator">
                        <span class="spinner"></span>
                        Loading users...
                      </div>
                    } @else {
                      No users found
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        @if (showToast) {
          <div class="toast-container">
            <div class="toast" [class.success]="toastType === 'success'" [class.error]="toastType === 'error'">
              <div class="toast-content">
                <i class="material-icons">{{ toastType === 'success' ? 'check_circle' : 'error' }}</i>
                <span>{{ toastMessage }}</span>
              </div>
              <button class="toast-close" (click)="hideToast()">
                <i class="material-icons">close</i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .users-content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 24px;
      position: relative;
    }

    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #f8f9fa;
      border-radius: 4px;
      padding: 8px 16px;
      width: 300px;

      i {
        color: #666;
        margin-right: 8px;
      }

      input {
        border: none;
        background: none;
        outline: none;
        width: 100%;
        color: #2c3e50;

        &::placeholder {
          color: #666;
        }
      }
    }

    .add-user-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background: #34495e;
      }
    }

    .users-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          color: #2c3e50;
          font-weight: 500;
        }

        td {
          color: #666;
        }

        tr.deleting {
          background-color: rgba(220, 53, 69, 0.1);
        }
      }
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.875rem;
      background: #dc3545;
      color: white;

      &.active {
        background: #28a745;
      }
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 4px;
      border: none;
      background: none;
      color: #666;
      cursor: pointer;
      transition: color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #2c3e50;
      }

      &:disabled {
        color: #ccc;
        cursor: not-allowed;
      }
    }

    .no-data {
      text-align: center;
      padding: 24px;
      color: #666;
    }

    .loading-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .spinner {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 3px solid rgba(44, 62, 80, 0.3);
      border-radius: 50%;
      border-top-color: #2c3e50;
      animation: spin 1s ease-in-out infinite;
    }

    .spinner-small {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(44, 62, 80, 0.3);
      border-radius: 50%;
      border-top-color: #2c3e50;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 300px;
      background: white;
      border-left: 4px solid;

      &.success {
        border-left-color: #28a745;
        i {
          color: #28a745;
        }
      }

      &.error {
        border-left-color: #dc3545;
        i {
          color: #dc3545;
        }
      }
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 8px;

      i {
        font-size: 20px;
      }
    }

    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #333;
      }
    }
  `]
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  isLoading = true;
  deletingUserId: number | null = null;
  
  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filterUsers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.showToastMessage('Failed to load users. Please try again.', 'error');
      }
    });
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.deletingUserId = id;
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.filterUsers();
          this.deletingUserId = null;
          this.showToastMessage('User deleted successfully', 'success');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.deletingUserId = null;
          this.showToastMessage('Failed to delete user. Please try again.', 'error');
        }
      });
    }
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.id]);
  }

  openAddUserModal() {
    this.router.navigate(['/users/add']);
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    // Clear any existing timeout
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    // Auto-hide after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.showToast = false;
  }
} 