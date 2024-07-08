import { computed, Injectable, signal } from "@angular/core";

import { User } from "./user";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users = signal<User[]>([]);
    private loggedInUser = signal<User | undefined>(undefined);

    isAuthenticated = computed(() => this.loggedInUser() !== undefined);

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
        this.loggedInUser.set(this.users().find(
            u => u.email === email && u.password === password
        ));
    }

    logOut() {
        this.loggedInUser.set(undefined);
    }

    private fetchUsers() {
        this.users.set(JSON.parse(window.localStorage.getItem('users') ?? "[]"));
    }

    private saveUsers() {
        window.localStorage.setItem('users', JSON.stringify(this.users()));
    }
}