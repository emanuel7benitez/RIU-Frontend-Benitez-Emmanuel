import {Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input()  title: string = 'Heroes'
  @Input()  subtitle: string = 'Todo sobre tus heroes en un solo lugar.'
 }
