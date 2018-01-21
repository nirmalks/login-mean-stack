import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { UserService } from '../services/user-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

class UserServiceStub {
  getData() { return 'stub'; }
}

class RouterStub {
  navigateByUrl() { }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: UserService, useClass: UserServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.profileForm.invalid).toBeFalsy();
  });

});
