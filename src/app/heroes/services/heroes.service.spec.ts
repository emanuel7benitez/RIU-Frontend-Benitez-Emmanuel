import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Superheroe } from '../interfaces/heroes.interface';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver la cantidad total de héroes activos', () => {
    const total = service.totalHeroes();
    const todos = service['_allHeroes']().filter(h => h.activo);
    expect(total).toBe(todos.length);
  });

  it('debería aplicar correctamente el filtro', () => {
    service.setFilter('lantern');
    const total = service.totalHeroes();
    const coincide = service['_allHeroes']().filter(h =>
      h.activo &&
      (h.nombre.toLowerCase().includes('lantern') ||
       h.alias.toLowerCase().includes('lantern') ||
       h.poderes.some(p => p.toLowerCase().includes('lantern')))
    );
    expect(total).toBe(coincide.length);
  });

  it('debería agregar un nuevo héroe', () => {
    const anterior = service.totalHeroes();
    service.agregar({
      nombre: 'Nuevo',
      alias: 'Test',
      activoDesde: 2020,
      activo: true,
      img: '',
      descripcion: 'desc',
      poderes: ['Invisibilidad'],
      biografia: {
        nombreReal: 'Test Man',
        ocupacion: 'Tester',
        baseDeOperaciones: 'Lab',
        afiliaciones: 'QA Force'
      }
    });
    const nuevoTotal = service.totalHeroes();
    expect(nuevoTotal).toBe(anterior + 1);
  });

  it('debería editar un héroe existente', () => {
    const primerHeroe = service['_allHeroes']()[0];
    service.editar(primerHeroe.id, { nombre: 'Modificado' });
    const actualizado = service.getHeroeById(primerHeroe.id);
    expect(actualizado.nombre).toBe('Modificado');
  });

  it('debería eliminar lógicamente un héroe', () => {
    const primerHeroe = service['_allHeroes']().find(h => h.activo)!;
    service.eliminarLogico(primerHeroe.id);
    const total = service.totalHeroes();
    expect(service['_allHeroes']().find(h => h.id === primerHeroe.id)?.activo).toBeFalse();
    expect(total).toBeLessThan(service['_allHeroes']().length);
  });

  it('debería cambiar de página', () => {
    service.changePage(1);
    expect(service.currentPage()).toBe(1);
  });

  it('debería cambiar el tamaño de página y resetear a la primera', () => {
    service.changePageSize(2);
    expect(service.pageSize()).toBe(2);
    expect(service.currentPage()).toBe(0);
  });

  it('debería lanzar error si no encuentra un héroe activo por ID', () => {
    expect(() => service.getHeroeById(99999)).toThrowError();
  });
});
