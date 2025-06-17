import { Component, input, Input } from '@angular/core';
import { Biografia } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-biography',
  standalone: true, 
  imports: [],
  templateUrl: './heroe-biography.component.html',
  styleUrl: './heroe-biography.component.css',
})
export class HeroeBiographyComponent { 
  biography= input<Biografia> ({
    nombreReal: '',
    ocupacion: '',
    baseDeOperaciones: '',
    afiliaciones: '',
  })
}
