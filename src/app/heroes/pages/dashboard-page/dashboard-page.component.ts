import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export default class DashboardPageComponent { 
}
