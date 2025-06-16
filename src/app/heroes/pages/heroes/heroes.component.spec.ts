import { ComponentFixture, TestBed } from '@angular/core/testing';
import  HeroesComponent  from './heroes.component';
import { HeroesService } from '../../services/heroes.service';
import { Superheroe } from '../../interfaces/heroes.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  const fakeHeroes: Superheroe[] = [
    {
      id: 1,
      nombre: 'Superman',
      alias: 'Clark Kent',
      descripcion: 'Hombre de acero',
      poderes: ['Volar', 'Fuerza'],
      activo: true,
      activoDesde: 2000,
      img: '',
      biografia: {
        nombreReal: 'Clark Kent',
        ocupacion: 'Periodista',
        baseDeOperaciones: 'Metrópolis',
        afiliaciones: 'Liga de la Justicia',
      }
    }
  ];

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj<HeroesService>('HeroesService', [
      'paginatedHeroes', 'totalHeroes',
      'changePage', 'changePageSize',
      'setFilter', 'currentPage', 'pageSize'
    ]);
    mockHeroesService.currentPage.and.returnValue(0);
    mockHeroesService.pageSize.and.returnValue(5);

    await TestBed.configureTestingModule({
      imports: [HeroesComponent, MatPaginatorModule, NoopAnimationsModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a changePage(0) en el constructor', () => {
    expect(mockHeroesService.changePage).toHaveBeenCalledWith(0);
  });

  it('debería obtener héroes paginados del servicio', () => {
    const heroes = component.heroes;
    expect(heroes.length).toBe(1);
    expect(heroes[0].nombre).toBe('Superman');
  });

  it('debería actualizar el filtro y resetear la página al cambiar el filtro', () => {
    component.onFilterChange('super');
    expect(mockHeroesService.setFilter).toHaveBeenCalledWith('super');
    expect(mockHeroesService.changePage).toHaveBeenCalledWith(0);
  });

  it('debería actualizar el tamaño de página y/o índice en onPageChange', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 10, length: 20 });
    expect(mockHeroesService.changePageSize).toHaveBeenCalledWith(10);
    expect(mockHeroesService.changePage).toHaveBeenCalledWith(1);
  });
});
