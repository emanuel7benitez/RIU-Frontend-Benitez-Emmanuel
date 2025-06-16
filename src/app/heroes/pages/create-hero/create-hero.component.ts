
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormHeroComponent } from '../../components/form-hero/form-hero.component';
import { Superheroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [FormHeroComponent],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css'
})
export default class CreateHeroComponent {
  private heroesService = inject(HeroesService);
  private router = inject(Router);
  constructor() {}

  guardar(e:any){
    console.log(e, 'evento desde create-hero');
    this.heroesService.agregar(e)
    Swal.fire("Heroe creado", "El heroe se ha creado correctamente", "success");
    this.heroesService.changePage(0);
    this.router.navigate(['/dashboard/heroes']);
  }
  
 }
