import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { EditUserComponent } from './components/admin/users/edit-user/edit-user.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { StockComponent } from './components/stock/stock.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/users/edit/:id', component: EditUserComponent },
  { path: 'admin/users/add', component: AddUserComponent },
  { path: 'stock', component: StockComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/dashboard' }
];
