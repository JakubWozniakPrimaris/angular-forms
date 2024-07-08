import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UserComponent } from "./user/user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { RouterLink, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [UserComponent, AddUserComponent, UsersComponent],
    imports: [CommonModule, UsersRoutingModule, RouterModule, RouterLink, ReactiveFormsModule]
})
export class UsersModule {

}
