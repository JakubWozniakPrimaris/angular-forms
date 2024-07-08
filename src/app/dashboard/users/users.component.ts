import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private accountService = inject(AccountService);

  accounts = this.accountService.accounts;
  isAddingUser = signal(false);

  onStartAddUser() {
    this.isAddingUser.set(true);
  }

  onFinishAddUser() {
    this.isAddingUser.set(false);
  }
}
