import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DbService } from '../services/db.service';
import { AlertController, AnimationController } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    dbServiceSpy = jasmine.createSpyObj('DbService', ['logout']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        AnimationController,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título "Home"', () => {
    const titleElement = fixture.nativeElement.querySelector('ion-title');
    expect(titleElement.textContent).toContain('Home');
  });

  it('debe cambiar el segmento cuando se llama a segmentChanged()', () => {
    const event = { detail: { value: 'certificaciones' } };
    component.segmentChanged(event);
    expect(component.segment).toBe('certificaciones');
  });

  it('debe mostrar el nombre de usuario', () => {
    component.username = 'TestUser';
    fixture.detectChanges();
    const welcomeMessage =
      fixture.nativeElement.querySelector('ion-card-title');
    expect(welcomeMessage.textContent).toContain('Bienvenido, TestUser');
  });

  it('debe llamar a limpiarCampos() cuando se hace clic en el botón Limpiar', () => {
    spyOn(component, 'limpiarCampos');
    const limpiarButton = fixture.nativeElement.querySelector(
      'ion-button[type="button"]'
    );
    limpiarButton.click();
    expect(component.limpiarCampos).toHaveBeenCalled();
  });

  it('debe llamar a mostrarInformacion() cuando se hace clic en el botón Guardar', () => {
    spyOn(component, 'mostrarInformacion');
    const guardarButton = fixture.nativeElement.querySelectorAll(
      'ion-button[type="button"]'
    )[1];
    guardarButton.click();
    expect(component.mostrarInformacion).toHaveBeenCalled();
  });

  it('debe navegar correctamente cuando se llama a toDoNavegacion()', () => {
    spyOn(component['router'], 'navigate');
    component.toDoNavegacion('todo');
    expect(component['router'].navigate).toHaveBeenCalledWith(
      ['/todo'],
      jasmine.any(Object)
    );
  });
});
