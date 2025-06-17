import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Superheroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundHeroComponent } from '../../components/not-found-hero/not-found-hero.component';
import { HeaderDetailComponent } from "../../components/header-detail/header-detail.component";
import { HeroePowersComponent } from "../../components/heroe-powers/heroe-powers.component";
import { HeroeBiographyComponent } from "../../components/heroe-biography/heroe-biography.component";
import Swal from 'sweetalert2'
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-heroe-detail',
  standalone: true,
  imports: [RouterModule, MatButtonModule, NgxSpinnerModule, NotFoundHeroComponent, HeaderDetailComponent, HeroePowersComponent, HeroeBiographyComponent, MatDialogModule],
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroeDetailComponent {
  private _route = inject(ActivatedRoute);
  private _spinner = inject(NgxSpinnerService);
  private _router = inject(Router);
  private _heroesService = inject(HeroesService);
  readonly dialog = inject(MatDialog);

  heroe!: Superheroe | null;

  ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.heroe = this._heroesService.getHeroeById(id) || null;
  }

  deleteHeroe(id: number) {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar este superheroe?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._spinner.show();
        setTimeout(() => {
          this._heroesService.eliminarLogico(id);
          this.heroe = null;
          this._heroesService.changePage(0);
          this._router.navigate(['/dashboard/heroes']);
          this._spinner.hide();
          Swal.fire("Super Heroe Eliminado!", "", "success");
        }, 1000)
      }
    });
  }

  editHeroe() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'my-dialog';
    dialogConfig.width = '1020px';
    dialogConfig.maxWidth = '1020px';
    dialogConfig.data = {
      hero: this.heroe
    };
    const dialogRef = this.dialog.open(ModalEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.heroe) {
        this._spinner.show();
        setTimeout(()=>{
          this._heroesService.editar(this.heroe!.id, result.heroe);
        this._heroesService.changePage(0);
        this._router.navigate(['/dashboard/heroes']);
        this._spinner.hide();
        Swal.fire("Super Heroe Editado!", "", "success");
        }, 1000)
      }
    });

  }

}
