import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private accountService = inject(AccountService);
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

  isSubmitted = false;

  get emailInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.email.touched &&
      this.form.controls.email.dirty)) &&
      this.form.controls.email.invalid;
  }

  get passwordInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.password.touched &&
      this.form.controls.password.dirty)) &&
      this.form.controls.password.invalid;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const enteredEmail = this.form.value.email!;
    const enteredPassword = this.form.value.password!;

    this.accountService.logIn(enteredEmail, enteredPassword);
    if (this.accountService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    } else {
      this.toastrService.error('Incorrect username or password', 'Login failed')
    }
  }
}
