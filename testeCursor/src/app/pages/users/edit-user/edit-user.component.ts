import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="edit-user-container">
      <div class="edit-user-header">
        <h2>Edit User</h2>
        <button class="back-button" (click)="goBack()">
          <i class="material-icons">arrow_back</i>
          Back to Users
        </button>
      </div>

      @if (isLoading) {
        <div class="loading-container">
          <span class="spinner"></span>
          <p>Loading user data...</p>
        </div>
      } @else if (loadError) {
        <div class="error-container">
          <i class="material-icons error-icon">error</i>
          <p>{{ loadError }}</p>
          <button class="retry-button" (click)="loadUser()">Retry</button>
        </div>
      } @else {
        <div class="form-container">
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name" 
                placeholder="Enter user name"
                [class.invalid]="isFieldInvalid('name')"
              >
              @if (isFieldInvalid('name')) {
                <div class="error-message">Name is required</div>
              }
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="Enter user email"
                [class.invalid]="isFieldInvalid('email')"
              >
              @if (isFieldInvalid('email')) {
                <div class="error-message">
                  @if (userForm.get('email')?.hasError('required')) {
                    Email is required
                  } @else if (userForm.get('email')?.hasError('email')) {
                    Please enter a valid email address
                  }
                </div>
              }
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password" 
                placeholder="Enter password (leave empty to keep current)"
                [class.invalid]="isFieldInvalid('password')"
              >
              @if (isFieldInvalid('password')) {
                <div class="error-message">
                  @if (userForm.get('password')?.hasError('minlength')) {
                    Password must be at least 3 characters
                  }
                </div>
              }
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-container">
                <input type="checkbox" formControlName="actived">
                <span class="checkbox-label">Active</span>
              </label>
            </div>

            <div class="form-actions">
              <button type="button" class="cancel-button" (click)="goBack()">Cancel</button>
              <button type="submit" class="submit-button" [disabled]="userForm.invalid || isSubmitting">
                @if (isSubmitting) {
                  <span class="spinner"></span>
                  Saving...
                } @else {
                  Update User
                }
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  `,
  styles: [`
    .edit-user-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .edit-user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h2 {
        color: #2c3e50;
        margin: 0;
      }
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: transparent;
      color: #2c3e50;
      border: 1px solid #2c3e50;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #f8f9fa;
      }

      i {
        font-size: 18px;
      }
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .error-icon {
      font-size: 48px;
      color: #dc3545;
      margin-bottom: 16px;
    }

    .retry-button {
      margin-top: 16px;
      padding: 8px 16px;
      background: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .form-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 24px;
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        color: #2c3e50;
        font-weight: 500;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"] {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s;

        &:focus {
          outline: none;
          border-color: #2c3e50;
        }

        &.invalid {
          border-color: #dc3545;
        }
      }
    }

    .checkbox-group {
      margin-top: 16px;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;

      input[type="checkbox"] {
        margin-right: 8px;
        cursor: pointer;
      }

      .checkbox-label {
        color: #2c3e50;
      }
    }

    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }

    .cancel-button {
      padding: 10px 20px;
      background: transparent;
      color: #2c3e50;
      border: 1px solid #2c3e50;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #f8f9fa;
      }
    }

    .submit-button {
      padding: 10px 20px;
      background: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: #34495e;
      }

      &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
      }
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class EditUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userId!: number;
  userForm!: FormGroup;
  isLoading = true;
  isSubmitting = false;
  loadError: string | null = null;

  ngOnInit(): void {
    // Initialize the form with empty values
    this.initForm();
    
    // Get the user ID from the route parameters
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Convert to number
      if (this.userId) {
        this.loadUser();
      } else {
        this.loadError = 'Invalid user ID';
        this.isLoading = false;
      }
    });
  }

  initForm(user?: User): void {
    this.userForm = this.fb.group({
      name: [user?.name || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(3)], // Password is optional for editing
      actived: [user?.actived ?? true]
    });
  }

  loadUser(): void {
    this.isLoading = true;
    this.loadError = null;
    
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.initForm(user);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.loadError = 'Failed to load user data. Please try again.';
        this.isLoading = false;
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    
    // Create a copy of the form value
    const userData = { ...this.userForm.value };
    
    // If password is empty, remove it from the request
    if (!userData.password) {
      delete userData.password;
    }
    
    this.userService.updateUser({ ...userData, id: this.userId }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
} 