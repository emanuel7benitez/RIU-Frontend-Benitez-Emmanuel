import { Component, input } from '@angular/core';
import { HeroeChipComponent } from '../heroe-chip/heroe-chip.component';

@Component({
  selector: 'app-heroe-powers',
  imports: [HeroeChipComponent],
  standalone: true,
  templateUrl: './heroe-powers.component.html',
  styleUrl: './heroe-powers.component.css',
})
export class HeroePowersComponent { 
  powers = input<string[]>([]);
  title = input<string>('Powers');
}
