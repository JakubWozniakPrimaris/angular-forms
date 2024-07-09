import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterModule } from "@angular/router";
import { TasksRoutingModule } from "./tasks-routing.module";

import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { AddTaskComponent } from "./add-task/add-task.component";

@NgModule({
    declarations: [TasksComponent, TaskComponent, AddTaskComponent],
    imports: [CommonModule, TasksRoutingModule, RouterModule, RouterLink, ReactiveFormsModule]
})
export class TasksModule {

}
