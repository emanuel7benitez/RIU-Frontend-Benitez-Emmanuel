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

@Component({
  selector: 'app-heroe-detail',
  standalone: true,
  imports: [RouterModule, MatButtonModule, NotFoundHeroComponent, HeaderDetailComponent, HeroePowersComponent, HeroeBiographyComponent, MatDialogModule],
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroesService);
  readonly dialog = inject(MatDialog);

  heroe!: Superheroe | null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroe = this.heroesService.getHeroeById(id) || null;
  }

  deleteHeroe(id: number) {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar este superheroe?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.eliminarLogico(id);
        this.heroe = null;
        this.heroesService.changePage(0);
        this.router.navigate(['/dashboard/heroes']);
        Swal.fire("Super Heroe Eliminado!", "", "success");
      }
    });
  }

  editHeroe() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'my-dialog';
    dialogConfig.width = '1020px';
    dialogConfig.minHeight = '600px';
    dialogConfig.maxWidth = '1020px';
    dialogConfig.data = {
      hero: this.heroe
    };
    const dialogRef = this.dialog.open(ModalEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.heroe}`);
      if (result && result.heroe) {
        this.heroesService.editar(this.heroe!.id, result.heroe);
        this.heroesService.changePage(0);
        this.router.navigate(['/dashboard/heroes']);
        Swal.fire("Super Heroe Editado!", "", "success");
      }
    });

  }

}
