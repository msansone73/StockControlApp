import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2 class="mb-4">Edit User</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="form-control"
            [class.is-invalid]="userForm.get('name')?.invalid && userForm.get('name')?.touched"
          >
          <div class="invalid-feedback" *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="form-control"
            [class.is-invalid]="userForm.get('email')?.invalid && userForm.get('email')?.touched"
          >
          <div class="invalid-feedback" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
            Please enter a valid email
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password (leave blank to keep current)</label>
          <input
            type="password"
            id="password"
            formControlName="password"
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select
            id="role"
            formControlName="role"
            class="form-control"
            [class.is-invalid]="userForm.get('role')?.invalid && userForm.get('role')?.touched"
          >
            <option value="">Select a role</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="USER">User</option>
            <option value="GUEST">Guest</option>
          </select>
          <div class="invalid-feedback" *ngIf="userForm.get('role')?.invalid && userForm.get('role')?.touched">
            Role is required
          </div>
        </div>

        <div class="form-group">
          <div class="form-check">
            <input
              type="checkbox"
              id="actived"
              formControlName="actived"
              class="form-check-input"
            >
            <label class="form-check-label" for="actived">Active</label>
          </div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">
            Update User
          </button>
          <button type="button" class="btn btn-secondary ms-2" (click)="cancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .invalid-feedback {
      display: block;
      color: #dc3545;
      font-size: 0.875em;
      margin-top: 0.25rem;
    }
    .is-invalid {
      border-color: #dc3545;
    }
    .ms-2 {
      margin-left: 0.5rem;
    }
  `]
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number=0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required],
      actived: [true]
    });
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.http.get(`http://localhost:8080/users/${this.userId}`)
      .subscribe({
        next: (user: any) => {
          this.userForm.patchValue({
            name: user.name,
            email: user.email,
            role: user.role,
            actived: user.actived
          });
        },
        error: (error) => {
          console.error('Error loading user:', error);
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value };
      if (!userData.password) {
        delete userData.password;
      }

      this.http.put(`http://localhost:8080/users/${this.userId}`, userData)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            console.error('Error updating user:', error);
          }
        });
    }
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }
} 