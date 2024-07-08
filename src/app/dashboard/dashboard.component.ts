import { Component, inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../users/user-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private userService = inject(UserService);

  showContent = this.userService.isAuthenticated;
}
