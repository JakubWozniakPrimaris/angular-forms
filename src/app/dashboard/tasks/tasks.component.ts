import { Component, inject, signal } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private taskService = inject(TaskService);

  tasks = this.taskService.loggedInUsersTasks;

  isAddingTask = signal(false);

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onFinishAddTask() {
    this.isAddingTask.set(false);
  }
}
