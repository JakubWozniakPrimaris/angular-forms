import { Component, inject, input, signal } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { notPastDate } from '../add-task/add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task = input.required<Task>();
  isEditable = signal(false);

  form = new FormGroup({
    title: new FormControl({ value: '', disabled: true },
      [Validators.required, Validators.maxLength(100)]
    ),
    description: new FormControl({ value: '', disabled: true },
      [Validators.maxLength(1000)]
    ),
    dueDate: new FormControl({ value: '', disabled: true },
      [Validators.required, notPastDate]
    ),
  })

  private taskService = inject(TaskService);
  private toastrService = inject(ToastrService);
  private isSubmitted = false;

  ngOnInit() {
    this.updateForm();
  }

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

  onLeftButtonClick() {
    if (this.isEditable()) {
      this.isSubmitted = true;

      if (this.form.invalid) {
        return;
      }

      const enteredTitle = this.form.value.title!;
      const enteredDescription = this.form.value.description ?? "";
      const enteredDueDate = this.form.value.dueDate!;

      const response = this.taskService.updateTask({
        uuid: this.task().uuid,
        userId: this.task().userId,
        title: enteredTitle,
        description: enteredDescription,
        creationDate: this.task().creationDate,
        modificationDate: this.task().modificationDate,
        dueDate: enteredDueDate,
      });

      if (response.error === '') {
        this.toastrService.success('Task was successfully saved', 'Task edit');
        this.disableEdit();
      } else {
        this.toastrService.error(response.error, 'Task edit');
      }

    } else {
      this.form.controls.title.enable();
      this.form.controls.description.enable();
      this.form.controls.dueDate.enable();
      this.isEditable.set(true);
    }
  }

  onRightButtonClick() {
    if (this.isEditable()) {
      this.updateForm();
      this.disableEdit();
    } else {
      this.taskService.deleteTask(this.task().uuid);
    }
  }

  private disableEdit() {
    this.form.controls.title.disable();
    this.form.controls.description.disable();
    this.form.controls.dueDate.disable();
    this.isEditable.set(false);
  }

  private updateForm() {
    this.form.patchValue({
      title: this.task().title,
      description: this.task().description,
      dueDate: this.task().dueDate
    })
  }
}
