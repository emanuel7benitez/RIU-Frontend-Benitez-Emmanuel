import { computed, Injectable, signal } from '@angular/core';
import { Superheroe } from '../interfaces/heroes.interface';
import { SUPERHEROES_DATA } from './heroes.data';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private allHeroes = signal<Superheroe[]>(SUPERHEROES_DATA);
  private _pageSize = signal(5);
  private _currentPage = signal(0);
  pageSize = this._pageSize.asReadonly();
  currentPage = this._currentPage.asReadonly();;

  paginatedHeroes = computed(() => {
    const start = this.currentPage() * this.pageSize();
    return this.allHeroes().slice(start, start + this.pageSize());
  });

  totalHeroes = computed(() => this.allHeroes().length);

  changePage(index: number) {
    this._currentPage.set(index);
  }

  changePageSize(size: number) {
    this._pageSize.set(size);
    this._currentPage.set(0); // Reset solo si cambia el tamaño
  }

  agregar(heroe: Omit<Superheroe, 'id' | 'activo'>) {
    const lista = this.allHeroes();
    const nuevoId = lista.length ? Math.max(...lista.map(h => h.id)) + 1 : 1;
    const nuevo = { ...heroe, id: nuevoId, activo: true };
    this.allHeroes.set([...lista, nuevo]);
  }

  editar(id: number, cambios: Partial<Superheroe>) {
    this.allHeroes.update(lista =>
      lista.map(h => h.id === id ? { ...h, ...cambios } : h)
    );
  }

  eliminarLogico(id: number) {
    this.allHeroes.update(lista =>
      lista.map(h => h.id === id ? { ...h, activo: false } : h)
    );
  }

}
