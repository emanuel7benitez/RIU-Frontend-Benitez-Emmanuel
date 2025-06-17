import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import HeroesComponent from './heroes.component';
import { HeroesService } from '../../services/heroes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'changePage',
      'paginatedHeroes',
      'totalHeroes',
      'pageSize',
      'changePageSize',
      'currentPage',
      'setFilter'
    ]);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    heroesServiceSpy.paginatedHeroes.and.returnValue(([]));
    heroesServiceSpy.totalHeroes.and.returnValue((0));
    heroesServiceSpy.pageSize.and.returnValue(10);
    heroesServiceSpy.currentPage.and.returnValue(0);

    await TestBed.configureTestingModule({
      imports: [HeroesComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy }
      ]
    })
      .overrideComponent(HeroesComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and call changePage(0) in constructor', () => {
    expect(component).toBeTruthy();
    expect(heroesServiceSpy.changePage).toHaveBeenCalledWith(0);
  });

  

  it('should call changePageSize and changePage on onPageChange if pageSize or pageIndex changes', () => {
    heroesServiceSpy.pageSize.and.returnValue(5);
    heroesServiceSpy.currentPage.and.returnValue(1);
    const event: PageEvent = { pageIndex: 2, pageSize: 10, length: 100 };
    component.onPageChange(event);
    expect(heroesServiceSpy.changePageSize).toHaveBeenCalledWith(10);
    expect(heroesServiceSpy.changePage).toHaveBeenCalledWith(2);
  });

  it('should not call changePageSize if pageSize is the same', () => {
    heroesServiceSpy.pageSize.and.returnValue(10);
    heroesServiceSpy.currentPage.and.returnValue(0);
    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    component.onPageChange(event);
    expect(heroesServiceSpy.changePageSize).not.toHaveBeenCalled();
    expect(heroesServiceSpy.changePage).toHaveBeenCalledWith(1);
  });

  it('should not call changePage if pageIndex is the same', () => {
    heroesServiceSpy.pageSize.and.returnValue(10);
    heroesServiceSpy.currentPage.and.returnValue(1);
    const event: PageEvent = { pageIndex: 1, pageSize: 20, length: 100 };
    component.onPageChange(event);
    expect(heroesServiceSpy.changePageSize).toHaveBeenCalledWith(20);
    expect(heroesServiceSpy.changePage).not.toHaveBeenCalledWith(1);
  });

  it('should call setFilter and changePage(0) on onFilterChange', () => {
    component.onFilterChange('batman');
    expect(heroesServiceSpy.setFilter).toHaveBeenCalledWith('batman');
    expect(heroesServiceSpy.changePage).toHaveBeenCalledWith(0);
  });
});