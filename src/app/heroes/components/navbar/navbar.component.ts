import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { MENU_DATA } from '../../services/menu.data';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { 
  @Input() menu: Menu[] = [...MENU_DATA];
}
