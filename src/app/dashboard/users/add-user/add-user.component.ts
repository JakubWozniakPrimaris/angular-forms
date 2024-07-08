import { Component, inject, output } from '@angular/core';
import { AccountService } from '../../../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  close = output();
  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required, Validators.maxLength(100)]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    })
  })

  isSubmitted = false;

  get firstNameInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.firstName.touched &&
      this.form.controls.firstName.dirty)) &&
      this.form.controls.firstName.invalid;
  }

  get lastNameInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.lastName.touched &&
      this.form.controls.lastName.dirty)) &&
      this.form.controls.lastName.invalid;
  }

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

  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService)

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const enteredFirstName = this.form.value.firstName!;
    const enteredLastName = this.form.value.lastName!;
    const enteredEmail = this.form.value.email!;
    const enteredPassword = this.form.value.password!;

    const response = this.accountService.registerAccount(
      enteredFirstName, enteredLastName, enteredEmail, enteredPassword
    );

    if (response.error === '') {
      this.close.emit();
      this.toastrService.success('User was successfully added', 'User added');
    } else {
      this.toastrService.error(response.error, 'User added');
    }

  }
}
