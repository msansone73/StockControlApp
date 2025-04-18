import { Injectable, signal } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UsersService) { }

  userLogged?:User;
  loggeduser = signal<User>({
    name: '',
    email: '',
    password: '',
    createdAt: new Date(),
    role: '',
    actived: true
  });

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByLogin(email, password).subscribe(
        (user: User) => {
          if (user) {
            this.userLogged = user;
            this.loggeduser.set(user);
            resolve(user);
          } else {
            reject('Invalid credentials');
          }
        },
        (error) => {
          reject('Error logging in');
        }
      );
    });
  }

  logout(): void {
    this.userLogged = undefined;
  }

  isLoggedIn(): boolean {
    return this.userLogged !== undefined;
  }
  
  getUserLogged(): User | undefined {
    return this.userLogged;
  }


}
