import { computed, Injectable, signal } from '@angular/core';
import { Superheroe } from '../interfaces/heroes.interface';
import { SUPERHEROES_DATA } from './heroes.data';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _allHeroes = signal<Superheroe[]>(SUPERHEROES_DATA);
  private _pageSize = signal(5);
  private _currentPage = signal(0);
  pageSize = this._pageSize.asReadonly();
  currentPage = this._currentPage.asReadonly();
  private _filterTerm = signal('');


  paginatedHeroes = computed(() => {
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    const term = this._filterTerm();
    
    const filtered = this._allHeroes()
    .filter(h=> h.activo)
    .filter(h =>
      h.nombre.toLowerCase().includes(term) ||
      h.alias.toLowerCase().includes(term) ||
      h.poderes.some(p => p.toLowerCase().includes(term))
    );
  
    return filtered.slice(start, end);
  });
  
  totalHeroes = computed(() => {
    const term = this._filterTerm();
    return this._allHeroes()
    .filter(h => h.activo)
    .filter(h =>
      h.nombre.toLowerCase().includes(term) ||
      h.alias.toLowerCase().includes(term) ||
      h.poderes.some(p => p.toLowerCase().includes(term))
    ).length;
  });

  changePage(index: number) {
    this._currentPage.set(index);
  }

  changePageSize(size: number) {
    this._pageSize.set(size);
    this._currentPage.set(0);
  }

  agregar(heroe: Omit<Superheroe, 'id'>) {
    const lista = this._allHeroes();
    const nuevoId = lista.length ? Math.max(...lista.map(h => h.id)) + 1 : 1;
    const nuevo = { ...heroe, id: nuevoId };
    this._allHeroes.set([...lista, nuevo]);
  }

  editar(id: number, cambios: Partial<Superheroe>) {
    this._allHeroes.update(lista =>
      lista.map(h => h.id == id ? { ...h, ...cambios } : h)
    );
  }

  eliminarLogico(id: number) {
    this._allHeroes.update(lista =>
      lista.map(h => h.id === id ? { ...h, activo: false } : h)
    );
  }

  getHeroeById(id: number): Superheroe {
    const heroe = this._allHeroes().find(h => h.id === id && h.activo);
    if (!heroe) {
      throw new Error(`Heroe con ID ${id} no encontrado`);
    }
    return heroe;
  }

  setFilter(term: string) {
    this._filterTerm.set(term.toLowerCase());
  }

}
