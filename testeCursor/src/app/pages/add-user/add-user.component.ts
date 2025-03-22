import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService, UserRole, User } from '../../services/user.service';
import '../../styles/shared.scss';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  userRoles = UserRole;
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', Validators.required],
    actived: [true]
  });

  isSubmitting = false;

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
    
    this.userService.createUser(this.userForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating user:', error);
        // Here you might want to show an error message to the user
        alert('Failed to create user. Please try again.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
} 