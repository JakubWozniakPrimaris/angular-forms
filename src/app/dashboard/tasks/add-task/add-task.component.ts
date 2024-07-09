import { Component, inject, output } from '@angular/core';
import { TaskService } from '../task.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export function notPastDate(control: AbstractControl) {
  if (Date.parse(control.value) - new Date().setUTCHours(0, 0, 0, 0) >= 0) {
    return null;
  }
  return { pastDate: true };
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  close = output();
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(1000)]
    }),
    dueDate: new FormControl('', {
      validators: [Validators.required, notPastDate]
    }),
  })

  isSubmitted = false;

  get titleInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.title.touched &&
      this.form.controls.title.dirty)) &&
      this.form.controls.title.invalid;
  }

  get descriptionInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.description.touched &&
      this.form.controls.description.dirty)) &&
      this.form.controls.description.invalid;
  }

  get dueDateInvalid() {
    return (this.isSubmitted ||
      (this.form.controls.dueDate.touched &&
      this.form.controls.dueDate.dirty)) &&
      this.form.controls.dueDate.invalid;
  }

  private toastrService = inject(ToastrService);
  private taskService = inject(TaskService);
  
  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const enteredTitle = this.form.value.title!;
    const enteredDescription = this.form.value.description ?? '';
    const enteredDueDate = this.form.value.dueDate!;

    this.taskService.addTask(enteredTitle, enteredDescription, enteredDueDate);

    this.close.emit();
    this.toastrService.success('Task was successfully added', 'Task added');
  }
}
