import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../users/user-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required, Validators.maxLength(100)]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    })
  })

  get emailInvalid() {
    return this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid;
  }

  get passwordInvalid() {
    return this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const enteredEmail = this.form.value.email!;
    const enteredPassword = this.form.value.password!;

    this.userService.logIn(enteredEmail, enteredPassword);
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    } else {
      this.toastrService.error('Incorrect username or password', 'Login failed')
    }
  }
}
