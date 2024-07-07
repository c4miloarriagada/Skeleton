import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPage } from './todo.page';
import { Router } from '@angular/router';
import { AnimationController, IonicModule } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          username: 'testuser',
          nombre: 'Test',
          apellido: 'User',
          educacion: 'Testing',
          fechaNacimiento: '1990-01-01',
        },
      },
    };
  }
  navigate() {}
}

class DbServiceStub {
  logout() {}
}

describe('TodoPage', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;
  let dbService: DbServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        AnimationController,
        { provide: Router, useClass: RouterStub },
        { provide: DbService, useClass: DbServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dbService = TestBed.inject(DbService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data from navigation state', () => {
    component.ngOnInit();
    expect(component.username).toBe('testuser');
    expect(component.nombre).toBe('Test');
    expect(component.apellido).toBe('User');
    expect(component.educacion).toBe('Testing');
    expect(component.fechaNacimiento).toBe('1990-01-01');
  });

  it('should add a new task', () => {
    component.nuevaTarea = 'Test Task';
    component.agregarTarea();
    expect(component.tareas.length).toBe(1);
    expect(component.tareas[0].valor).toBe('Test Task');
    expect(component.nuevaTarea).toBe('');
  });

  it('should set task to editing mode', () => {
    component.tareas = [{ valor: 'Test Task', editando: false }];
    component.editarTarea(0);
    expect(component.tareas[0].editando).toBeTrue();
  });

  it('should save a task', () => {
    component.tareas = [{ valor: 'Test Task', editando: true }];
    component.guardarTarea(0);
    expect(component.tareas[0].editando).toBeFalse();
  });

  it('should delete a task', () => {
    component.tareas = [{ valor: 'Test Task', editando: false }];
    component.eliminarTarea(0);
    expect(component.tareas.length).toBe(0);
  });

  it('should call logout from DbService', () => {
    spyOn(dbService, 'logout').and.callThrough();
    component.logout();
    expect(dbService.logout).toHaveBeenCalled();
  });
});
