import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log In'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
