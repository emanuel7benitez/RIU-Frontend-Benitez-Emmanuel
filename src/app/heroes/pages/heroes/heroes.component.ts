import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardComponent } from '../../components/heroe-card/heroe-card.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundHeroComponent } from "../../components/not-found-hero/not-found-hero.component";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [HeroeCardComponent, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, NotFoundHeroComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroesComponent { 
  constructor(private heroesService: HeroesService) {
    this.heroesService.changePage(0);
  }

  get heroes() {
    return this.heroesService.paginatedHeroes();
  }

  get totalHeroes() {
    return this.heroesService.totalHeroes();
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

  onFilterChange(value: string) {
    this.heroesService.setFilter(value);
    this.heroesService.changePage(0);
  }

 
}
