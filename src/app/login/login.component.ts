import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginFormComponent {
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

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail);
    console.log(enteredPassword);
  }
}
