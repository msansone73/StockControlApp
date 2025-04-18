import { Component } from '@angular/core';
import { User } from '../../../models/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  constructor(
    private userService:UsersService, 
    private route:ActivatedRoute
  ) { 
    this.userId = this.route.snapshot.params['id'];
    if(this.userId>0){
      this.userService.getUser(this.userId).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          this.message = 'Error fetching user: ' + error;
          console.error('Error fetching user:', error);
        }
      );
    } 
  }


  userId: number=-1 

  message: string = '';

  user:User = {
    id: -1,
    name: '',
    email: '',
    password: '',
    createdAt: new Date(),
    role: '',
    actived: true
  }
    
  onSubmit() {
    if (this.userId > 0) {
      // Update existing user
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          this.message = 'User updated successfully!';
          console.log(response);
        },
        (error) => {
          this.message = 'Error updating user: ' + error;
          console.error(error);
        }
      );
    } else {
      this.user.id = undefined; // Set ID to 0 for new user
      // Handle form submission
      this.userService.createUser(this.user).subscribe(
        (response) => {
          this.message = 'User created successfully!';
          console.log(response);
        },
        (error) => {
          this.message = 'Error creating user: ' + error;
          console.error(error);
        }
      );  
    }
  }

  onCancel() {  
    // Handle cancel action
    console.log('Form cancelled');
  }

}
