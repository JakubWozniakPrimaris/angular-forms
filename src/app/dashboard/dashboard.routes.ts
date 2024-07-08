import { Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
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
        component: UsersComponent,
        title: 'Users'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        title: 'Tasks'
    }
];
