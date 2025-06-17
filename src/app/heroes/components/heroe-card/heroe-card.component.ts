import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Superheroe } from '../../interfaces/heroes.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-heroe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, CommonModule, RouterModule, MatListModule, MatDividerModule],
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroeCardComponent { 
  heroe = input<Superheroe>({} as Superheroe);
  showDetail = input<boolean>(false);
  imgHero:string = ''
  router = inject(Router);
  
  ngOnInit(): void {
    this.imgHero = this.heroe()?.img || 'https://www.gravatar.com/avatar/?d=mp&s=200';
  }

  verDetalle(id: number) {
    this.router.navigate(['dashboard', 'heroes', id]);
  }
}
