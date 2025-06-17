import { ChangeDetectionStrategy, Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
  heroeTemplate: Superheroe | undefined;

  readonly dialogRef = inject(MatDialogRef<ModalEditComponent>);
   constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: Superheroe }){
    
   }

  ngOnInit() {
    this.heroeTemplate = this.data.hero;
  }

  closeDialog() {
    this.dialogRef.close();
  }
  onFormSubmit(heroe: Omit<Superheroe, 'id'>) {
    this.dialogRef.close({heroe});
  }
 }
