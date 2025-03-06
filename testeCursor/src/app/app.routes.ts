import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component')
      .then(m => m.UsersComponent)
  },
  {
    path: 'users/add',
    loadComponent: () => import('./pages/users/add-user/add-user.component')
      .then(m => m.AddUserComponent)
  },
  {
    path: 'users/edit/:id',
    loadComponent: () => import('./pages/users/edit-user/edit-user.component')
      .then(m => m.EditUserComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component')
      .then(m => m.SettingsComponent)
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/help/help.component')
      .then(m => m.HelpComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
]; 