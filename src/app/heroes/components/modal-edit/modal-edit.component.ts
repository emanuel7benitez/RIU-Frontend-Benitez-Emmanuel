import { ChangeDetectionStrategy, Component, inject, Inject, Input, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormHeroComponent } from '../form-hero/form-hero.component';
import { Superheroe } from '../../interfaces/heroes.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [MatDialogModule, FormHeroComponent, MatIcon],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalEditComponent {
  @Input()
  hero!: Superheroe;
  readonly dialogRef = inject(MatDialogRef<ModalEditComponent>);
   constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: Superheroe }){
    
   }

  ngOnInit() {
    this.hero = this.data.hero;
    console.log(this.hero, 'hero desde modal-edit');
  }

  closeDialog() {
    this.dialogRef.close();
  }
  onFormSubmit(heroe: Omit<Superheroe, 'id'>) {
    console.log(heroe, 'evento desde modal-edit');
    this.dialogRef.close({heroe});
  }
 }
