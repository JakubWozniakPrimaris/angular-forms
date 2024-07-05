import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../users/userService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);

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

    const status = this.userService.logIn(enteredEmail, enteredPassword);
    console.log(status);
  }
}
