import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Account, AccountService } from '../../../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  account = input.required<Account>();
  isEditable = signal(false);

  form = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true },
      [Validators.required, Validators.maxLength(100)]
    ),
    lastName: new FormControl({ value: '', disabled: true },
      [Validators.required, Validators.maxLength(100)]
    ),
    email: new FormControl({ value: '', disabled: true },
      [Validators.required, Validators.email, Validators.maxLength(100)]
    ),
  });

  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  private isSubmitted = false;

  ngOnInit() {
    this.updateForm();
  }

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

  onLeftButtonClick() {
    if (this.isEditable()) {
      this.isSubmitted = true;

      if (this.form.invalid) {
        return;
      }

      const enteredFirstName = this.form.value.firstName!;
      const enteredLastName = this.form.value.lastName!;
      const enteredEmail = this.form.value.email!;

      const response = this.accountService.updateAccount({
        uuid: this.account().uuid,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: this.account().password
      });

      if (response.error === '') {
        this.toastrService.success('User info was successfully saved', 'User info edit');
        this.disableEdit();
      } else {
        this.toastrService.error(response.error, 'User info edit');
      }

    } else {
      this.form.controls.firstName.enable();
      this.form.controls.lastName.enable();
      this.form.controls.email.enable();
      this.isEditable.set(true);
    }
  }

  onRightButtonClick() {
    if (this.isEditable()) {
      this.updateForm();
      this.disableEdit();
    } else {
      this.accountService.deleteAccount(this.account().uuid);
    }
  }

  private disableEdit() {
    this.form.controls.firstName.disable();
    this.form.controls.lastName.disable();
    this.form.controls.email.disable();
    this.isEditable.set(false);
  }

  private updateForm() {
    this.form.patchValue({
      firstName: this.account().firstName,
      lastName: this.account().lastName,
      email: this.account().email
    })
  }
}
