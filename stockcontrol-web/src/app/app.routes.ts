import { Routes } from '@angular/router';
import { HomeComponent } from './components/page/home/home.component';
import { AboutComponent } from './components/page/about/about.component';
import { UserListComponent } from './components/page/user-list/user-list.component';
import { UserFormComponent } from './components/page/user-form/user-form.component';
import { LoginComponent } from './components/page/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'user/new',
        component: UserFormComponent
    },
    {
        path: 'user/edit/:id',
        component: UserFormComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];
