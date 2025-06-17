import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Superheroe } from '../../interfaces/heroes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-hero',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './form-hero.component.html',
  styleUrl: './form-hero.component.css'
})
export class FormHeroComponent {
  private _fb = inject(FormBuilder);

  heroe = input<Superheroe | undefined>() ;
  emitFormSubmit = output<Omit<Superheroe, 'id'>>()

  title = input<string>('Crear Heroe');

  heroeForm!: FormGroup;

  ngOnInit(): void {
    const poderes = this.heroe()?.poderes ?? [];
    this.heroeForm = this._fb.group({
      nombre: [this.heroe()?.nombre || '', Validators.required],
      alias: [this.heroe()?.alias || '', Validators.required],
      poderes: this._fb.array(
        poderes.length
          ? poderes.map(p => this._fb.control(p, Validators.required))
          : [this._fb.control('', Validators.required)]
      ),
      activoDesde: [this.heroe()?.activoDesde || null, Validators.required],
      baseDeOperaciones: [this.heroe()?.biografia?.baseDeOperaciones || '', [Validators.required]],
      ocupacion: [this.heroe()?.biografia?.ocupacion || ''],
      img: [this.heroe()?.img || ''],
      descripcion: [this.heroe()?.descripcion || ''],
      afiliaciones: [this.heroe()?.biografia?.afiliaciones || ''],
      activo: [true]
    });
  }

  get poderes(): FormArray<FormControl> {
    return this.heroeForm.get('poderes') as FormArray<FormControl>;
  }

  addPoder(): void {
    this.poderes.push(this._fb.control('', Validators.required));
  }

  removePoder(index: number): void {
    this.poderes.removeAt(index);
  }

  submit(): void {
    if (this.heroeForm.invalid) {
      Swal.fire("Error", "Por favor, complete todos los campos requeridos marcados con '*'", "info");
      return
    }
    if (this.heroeForm.valid) {
      const newHeroe: Omit<Superheroe, 'id'> = this.transformarObjetoAInterfaz(this.heroeForm.value);

      this.emitFormSubmit.emit(newHeroe);
    } else {
      this.heroeForm.markAllAsTouched();
    }
  }

  transformarObjetoAInterfaz(obj: any): Omit<Superheroe, 'id'> {
    const superheroe: Omit<Superheroe, 'id'> = {
      nombre: obj.nombre,
      alias: obj.alias,
      activoDesde: Number(obj.activoDesde),
      descripcion: obj.descripcion,
      poderes: Array.isArray(obj.poderes) ? obj.poderes : [],
      img: obj.img || null,
      activo: Boolean(obj.activo),
      biografia: {
        nombreReal: obj.nombre,
        ocupacion: obj.ocupacion,
        baseDeOperaciones: obj.baseDeOperaciones,
        afiliaciones: obj.afiliaciones
      }
    };

    return superheroe;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.heroeForm.get('img')?.setValue(base64);
    };

    reader.readAsDataURL(file);
  }
}
