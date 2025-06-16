import {Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavbarComponent, SearchComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
 }
