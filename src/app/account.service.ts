import { computed, Injectable, signal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

export type Account = {
    uuid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private _accounts = signal<Account[]>([]);
    private loggedInAccount = signal<Account | undefined>(undefined);

    accounts = this._accounts.asReadonly();
    loggedInId = computed(() => this.loggedInAccount()?.uuid);

    constructor() {
        this.fetchUsers();
    }

    registerAccount(firstName: string, lastName: string, email: string, password: string) {
        if (this._accounts().some(acc => acc.email === email)) {
            return { 'error': 'Account with this email is already registered' };
        }

        this._accounts.set([...this._accounts(), {
            uuid: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }]);
        this.saveUsers();

        return { 'error': '' };
    }

    logIn(email: string, password: string) {
        this.loggedInAccount.set(this._accounts().find(
            acc => acc.email === email && acc.password === password
        ));
    }

    logOut() {
        this.loggedInAccount.set(undefined);
    }

    deleteAccount(uuid: string) {
        this._accounts.set(
            this._accounts().filter(acc => acc.uuid !== uuid)
        );
        this.saveUsers();
    }

    updateAccount(account: Account) {
        const acc = this._accounts().find(acc => acc.uuid === account.uuid);

        if (acc === undefined) {
            return { 'error': 'Account with this uuid does not exist' };
        }

        if (this._accounts().some(a => a.uuid != acc.uuid && a.email === account.email)) {
            return { 'error': 'Account with this email already exists' };
        }

        acc.firstName = account.firstName;
        acc.lastName = account.lastName;
        acc.email = account.email;
        this.saveUsers();

        return { error: '' };
    }

    private fetchUsers() {
        this._accounts.set(JSON.parse(window.localStorage.getItem('accounts') ?? "[]"));
    }

    private saveUsers() {
        window.localStorage.setItem('accounts', JSON.stringify(this._accounts()));
    }
}