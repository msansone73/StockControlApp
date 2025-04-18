import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/User';
@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  userName: string = '';


  constructor(private loginService:LoginService) {

    effect(() => {
      console.log('Effect triggered');
      const user: User | undefined = this.loginService.loggeduser();
      if (user) {
        this.userName = user.name;
      } else {
        this.userName = '';
      }
    });


   }

  
  menuItems = [
    { name: 'Home', route: '/home' },
    { name: 'About', route: '/about' },

    { name: 'User List', route: '/user-list' },
    { name: 'Login', route: '/login' },
  ];

}
