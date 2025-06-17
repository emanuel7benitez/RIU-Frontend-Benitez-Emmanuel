
import { Component, inject } from '@angular/core';
import { FormHeroComponent } from '../../components/form-hero/form-hero.component';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [FormHeroComponent, NgxSpinnerModule],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css'
})
export default class CreateHeroComponent {
  private _heroesService = inject(HeroesService);
  private _router = inject(Router);
  private _spinner = inject(NgxSpinnerService);
  constructor() { }

  guardar(e: any) {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
      this._heroesService.agregar(e)
      Swal.fire("Heroe creado", "El heroe se ha creado correctamente", "success");
      this._heroesService.changePage(0);
      this._router.navigate(['/dashboard/heroes']);
    }, 2000)

  }

}
