import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  userLogged: User= {
    name: '',
    email: 'maria@email.com',
    password: '123456',
    createdAt: new Date(),
    role: '',
    actived: true
  }


  message: string = '';

  onSubmit() {
    console.log('Login');
    this.loginService.login(this.userLogged.email, this.userLogged.password).then(
      (user) => {
        this.userLogged = user;
        console.log('Login successful:', user);
        this.message = 'Login successful!';
        // Handle successful login (e.g., redirect to dashboard)
      },
      (error) => {
        console.error('Login failed:', error);
        this.message = 'Login failed: ' + error;
        // Handle login failure (e.g., show error message)
      }
    );
  }


}
