import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraPage } from './camera.page';
import { DbService } from '../services/db.service';
import { Camera } from '@capacitor/camera';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    dbServiceSpy = jasmine.createSpyObj('DbService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CameraPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Camera"', () => {
    const titleElement = fixture.nativeElement.querySelector('ion-title');
    expect(titleElement.textContent).toContain('Camera');
  });

  it('should navigate to home when toDoNavegacion is called', () => {
    component.toDoNavegacion();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should not display photo card when no photo is taken', () => {
    const photoCard = fixture.nativeElement.querySelector('ion-card');
    expect(photoCard).toBeFalsy();
  });

  it('should display photo card when photo is taken', () => {
    component.photo = 'test/photo/url' as any;
    fixture.detectChanges();
    const photoCard = fixture.nativeElement.querySelector('ion-card');
    expect(photoCard).toBeTruthy();
  });
});
