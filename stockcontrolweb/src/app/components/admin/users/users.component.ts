import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';
  actived: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Users</h2>
        <button class="btn btn-primary" (click)="navigateToAdd()">
          <i class="fas fa-plus"></i> Add User
        </button>
      </div>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span [class]="user.actived ? 'badge bg-success' : 'badge bg-danger'">
                  {{ user.actived ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary me-2" (click)="editUser(user.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" (click)="deleteUser(user.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      padding: 0.5em 0.75em;
      border-radius: 4px;
      font-size: 0.875em;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    .me-2 {
      margin-right: 0.5rem;
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:8080/users')
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Error loading users:', error);
        }
      });
  }

  navigateToAdd() {
    this.router.navigate(['/admin/users/add']);
  }

  editUser(id: number) {
    this.router.navigate(['/admin/users/edit', id]);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:8080/users/${id}`)
        .subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (error) => {
            console.error('Error deleting user:', error);
          }
        });
    }
  }
} 