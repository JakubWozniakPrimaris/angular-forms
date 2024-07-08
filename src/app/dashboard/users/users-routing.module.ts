import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'add',
        component: AddUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {

}
