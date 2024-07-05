import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../users/userService';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  onSubmit() {
    console.log(this.email);
    console.log(this.password);

    const response = this.userService.addUser({
      email: this.email,
      password: this.password
    });

    console.log(response);
    if (response.error === '') {
      this.router.navigate(['login']);
    }
  }
}
