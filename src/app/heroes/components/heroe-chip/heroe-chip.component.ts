import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heroe-chip',
  standalone: true,
  imports: [],
  templateUrl: './heroe-chip.component.html',
  styleUrl: './heroe-chip.component.css',
})
export class HeroeChipComponent {
  @Input() item: string = '';
 }
