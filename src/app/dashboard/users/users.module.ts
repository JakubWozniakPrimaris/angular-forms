import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterModule } from "@angular/router";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";
import { AddUserComponent } from "./add-user/add-user.component";

@NgModule({
    declarations: [UserComponent, AddUserComponent, UsersComponent],
    imports: [CommonModule, UsersRoutingModule, RouterModule, RouterLink, ReactiveFormsModule]
})
export class UsersModule {

}
