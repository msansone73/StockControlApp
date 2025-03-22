import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService, UserRole, User } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userForm!: FormGroup;
  user: User | null = null;
  userRoles = UserRole;
  userId!: number;
  isSubmitting = false;

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.initForm();
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [this.user?.id],
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: [this.user?.password, Validators.required],
      role: [this.user?.role, Validators.required],
      actived: [this.user?.actived]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.userService.updateUser(this.userForm.value as User).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error updating user:', error);
        }
      });
    }
  }
} 