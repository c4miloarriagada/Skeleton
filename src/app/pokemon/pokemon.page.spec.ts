import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonPage } from './pokemon.page';
import { DbService } from '../services/db.service';
import { of } from 'rxjs';

describe('PokemonPage', () => {
  let component: PokemonPage;
  let fixture: ComponentFixture<PokemonPage>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    dbServiceSpy = jasmine.createSpyObj('DbService', [
      'logout',
      'dbReady',
      'hayPokemonGuardados',
      'buscarPokemon',
      'insertarPokemon',
      'presentToast',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      declarations: [PokemonPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Home"', () => {
    const titleElement = fixture.nativeElement.querySelector('ion-title');
    expect(titleElement.textContent).toContain('Home');
  });

  it('should navigate to home when toDoNavegacion is called', () => {
    component.toDoNavegacion();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should increase offset when nextPage is called', () => {
    const initialOffset = component.offset;
    component.nextPage();
    expect(component.offset).toBe(initialOffset + component.limit);
  });

  it('should decrease offset when previousPage is called', () => {
    component.offset = 20;
    const initialOffset = component.offset;
    component.previousPage();
    expect(component.offset).toBe(initialOffset - component.limit);
  });

  it('should not decrease offset below 0 when previousPage is called', () => {
    component.offset = 0;
    component.previousPage();
    expect(component.offset).toBe(0);
  });
});
