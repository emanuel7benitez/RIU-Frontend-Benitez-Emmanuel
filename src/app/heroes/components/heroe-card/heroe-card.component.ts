import { MatChipsModule } from '@angular/material/chips';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Superheroe } from '../../interfaces/heroes.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-heroe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, CommonModule],
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroeCardComponent { 
  @Input() heroe!: Superheroe
  imgHero:string = ''
  constructor() { 
  }
  
  ngOnInit(): void {
    this.imgHero = this.heroe.img || '/img/default.jpg';
    
  }
}
