import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardComponent } from '../../components/heroe-card/heroe-card.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [HeroeCardComponent, MatPaginatorModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroesComponent { 
  constructor(private heroesService: HeroesService) {}

  get heroes() {
    return this.heroesService.paginatedHeroes;
  }

  get totalHeroes() {
    return this.heroesService.totalHeroes;
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    if (pageSize !== this.heroesService.pageSize()) {
      this.heroesService.changePageSize(pageSize);
    }
  
    if (pageIndex !== this.heroesService.currentPage()) {
      this.heroesService.changePage(pageIndex);
    }
  }

 
}
