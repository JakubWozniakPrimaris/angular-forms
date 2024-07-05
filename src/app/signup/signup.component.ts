import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../users/userService';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  private userService = inject(UserService);

  onSubmit() {
    console.log(this.email);
    console.log(this.password);

    const response = this.userService.addUser({
      email: this.email,
      password: this.password
    });

    console.log(response);
  }
}
