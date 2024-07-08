import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { routes as dashboardRoutes } from './dashboard/dashboard.routes';
import { AccountService } from './account.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const canAccessDashboard: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const accountService = inject(AccountService);

    if (accountService.isAuthenticated()) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

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
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        children: dashboardRoutes,
        canMatch: [canAccessDashboard]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
