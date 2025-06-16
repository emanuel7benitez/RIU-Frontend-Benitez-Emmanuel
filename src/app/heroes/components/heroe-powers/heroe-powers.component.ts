import { Component, Input } from '@angular/core';
import { HeroeChipComponent } from '../heroe-chip/heroe-chip.component';

@Component({
  selector: 'app-heroe-powers',
  imports: [HeroeChipComponent],
  standalone: true,
  templateUrl: './heroe-powers.component.html',
  styleUrl: './heroe-powers.component.css',
})
export class HeroePowersComponent { 
  @Input() powers?: string[] = [];
  @Input() title: string = 'Powers';
}
