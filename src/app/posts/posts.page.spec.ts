import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsPage } from './posts.page';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class RouterStub {
  navigate(commands: any[]) {}
}

class DbServiceStub {
  logout() {}
}

describe('PostsPage', () => {
  let component: PostsPage;
  let fixture: ComponentFixture<PostsPage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: DbService, useClass: DbServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
