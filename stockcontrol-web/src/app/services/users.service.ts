import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }
  deleteUser(user: User): Observable<void> {  
    return this.http.delete<void>(`${environment.apiUrl}/users/${user.id}`);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users?email=${email}`);
  }
  getUserByLogin(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/login`, { email, password });
  }
}
