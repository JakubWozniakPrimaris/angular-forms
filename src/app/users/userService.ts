import { Injectable, signal } from "@angular/core";

import { User } from "./user";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    users = signal<User[]>([]);
    private loggedInUser?: User;

    constructor() {
        this.fetchUsers();
    }

    addUser(user: User) {
        if (this.users().some(u => u.email === user.email)) {
            return { 'error': 'user with this email is already registered' };
        }

        this.users.set([...this.users(), user]);
        this.saveUsers();

        return { 'error': '' };
    }

    logIn(email: string, password: string) {
        this.loggedInUser = this.users().find(
            u => u.email === email && u.password === password
        );

        return this.loggedInUser !== undefined;
    }

    private fetchUsers() {
        this.users.set(JSON.parse(window.localStorage.getItem('users') ?? "[]"));
    }

    private saveUsers() {
        window.localStorage.setItem('users', JSON.stringify(this.users()));
    }
}