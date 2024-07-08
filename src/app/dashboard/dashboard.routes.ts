import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'users',
        loadComponent: () => import('./users/users.module').then(mod => mod.UsersModule),
        title: 'Users'
    },
    {
        path: 'tasks',
        loadComponent: () => import('./tasks/tasks.component').then(mod => mod.TasksComponent),
        title: 'Tasks'
    }
];
