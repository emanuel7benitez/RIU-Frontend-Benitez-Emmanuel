import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private heroesService: HeroesService) { }
  onFilterChange(value: string) {
    this.heroesService.setFilter(value);
    this.heroesService.changePage(0);
  }
 }
