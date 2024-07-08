import { computed, Injectable, signal } from "@angular/core";

export type Account = {
    email: string,
    password: string
};

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private accounts = signal<Account[]>([]);
    private loggedInAccount = signal<Account | undefined>(undefined);

    isAuthenticated = computed(() => this.loggedInAccount() !== undefined);

    constructor() {
        this.fetchUsers();
    }

    registerAccount(account: Account) {
        if (this.accounts().some(acc => acc.email === account.email)) {
            return { 'error': 'Account with this email is already registered' };
        }

        this.accounts.set([...this.accounts(), account]);
        this.saveUsers();

        return { 'error': '' };
    }

    logIn(email: string, password: string) {
        this.loggedInAccount.set(this.accounts().find(
            acc => acc.email === email && acc.password === password
        ));
    }

    logOut() {
        this.loggedInAccount.set(undefined);
    }

    private fetchUsers() {
        this.accounts.set(JSON.parse(window.localStorage.getItem('accounts') ?? "[]"));
    }

    private saveUsers() {
        window.localStorage.setItem('accounts', JSON.stringify(this.accounts()));
    }
}