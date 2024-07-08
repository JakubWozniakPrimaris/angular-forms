import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../users/user-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private toastrService = inject(ToastrService);

  onSubmit() {
    const response = this.userService.addUser({
      email: this.email,
      password: this.password
    });

    if (response.error === '') {
      this.router.navigate(['login']);
      this.toastrService.success('You have been successfully signed up!', 'Sign up');
    } else {
      this.toastrService.error(response.error, 'Sign up')
    }
  }
}
