import { Component, inject } from '@angular/core';
import { UserService } from '../users/user-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  logOut() {
    console.log('log out');
    this.userService.logOut();
    this.router.navigate(['login']);
  }
}
