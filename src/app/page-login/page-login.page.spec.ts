import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { PageLoginPage } from './page-login.page';
import { DbService } from '../services/db.service';
import { Router, NavigationExtras } from '@angular/router';

describe('PageLoginPage', () => {
  let component: PageLoginPage;
  let fixture: ComponentFixture<PageLoginPage>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dbServiceSpy = jasmine.createSpyObj('DbService', [
      'buscarSesiones',
      'presentToast',
      'registrarUsuario',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PageLoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default credentials', () => {
    expect(component.credentials).toEqual({
      username: 'camilo',
      password: 1234,
    });
  });

  it('should validate credentials correctly', () => {
    expect(component.validateCredentials()).toBeTrue();

    component.credentials = { username: 'ab', password: 123 };
    expect(component.validateCredentials()).toBeFalse();

    component.credentials = { username: 'abcdefghi', password: 12345 };
    expect(component.validateCredentials()).toBeFalse();
  });

  it('should call login method when login button is clicked', () => {
    spyOn(component, 'login');
    const loginButton = fixture.nativeElement.querySelector(
      'ion-button[type="button"]'
    );
    loginButton.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should perform login successfully', async () => {
    const mockUsers = [{ user_name: 'camilo', password: 1234, active: 1 }];
    dbServiceSpy.buscarSesiones.and.returnValue(Promise.resolve(mockUsers));

    await component.login();

    expect(dbServiceSpy.presentToast).toHaveBeenCalledWith(
      'Inicio de sesión exitoso'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      ['/home'],
      jasmine.any(Object)
    );
  });

  it('should show error for inactive user', async () => {
    const mockUsers = [{ user_name: 'camilo', password: 1234, active: 0 }];
    dbServiceSpy.buscarSesiones.and.returnValue(Promise.resolve(mockUsers));

    await component.login();

    expect(dbServiceSpy.presentToast).toHaveBeenCalledWith('Usuario no activo');
  });

  it('should show error for incorrect credentials', async () => {
    const mockUsers = [{ user_name: 'otroUsuario', password: 5678, active: 1 }];
    dbServiceSpy.buscarSesiones.and.returnValue(Promise.resolve(mockUsers));

    await component.login();

    expect(dbServiceSpy.presentToast).toHaveBeenCalledWith(
      'Usuario o contraseña incorrectos'
    );
  });

  it('should register user successfully', async () => {
    dbServiceSpy.registrarUsuario.and.returnValue(Promise.resolve());

    await component.register();

    expect(dbServiceSpy.registrarUsuario).toHaveBeenCalledWith('camilo', 1234);
    expect(dbServiceSpy.presentToast).toHaveBeenCalledWith(
      'Usuario registrado exitosamente'
    );
  });

  it('should show error when registration fails', async () => {
    const error = new Error('Registration failed');
    dbServiceSpy.registrarUsuario.and.returnValue(Promise.reject(error));

    await component.register();

    expect(dbServiceSpy.presentToast).toHaveBeenCalledWith(
      `Error al registrar usuario: ${JSON.stringify(error)}`
    );
  });
});
