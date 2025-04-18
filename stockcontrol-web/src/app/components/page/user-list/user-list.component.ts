import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  constructor(private usersService: UsersService,
               private router: Router){ }
               
  users: User[] = [];  

  ngOnInit() {
    this.usersService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  addUser() {
       this.router.navigate(['/user/new']);
  }

  editUser(user: User) {
    this.router.navigate(['/user/edit/'+user.id]);
  }
  deleteUser(user: User) {
    this.usersService.deleteUser(user).subscribe(
      () => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }
}
