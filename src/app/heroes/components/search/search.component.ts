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
  constructor(private _heroesService: HeroesService) { }
  onFilterChange(value: string) {
    this._heroesService.setFilter(value);
    this._heroesService.changePage(0);
  }
 }
