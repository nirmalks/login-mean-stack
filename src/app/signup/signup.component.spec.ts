import { async, ComponentFixture, TestBed ,  } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'app/services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../app.routing.module';
import {Location , LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainContentComponent } from '../main-content/main-content.component';

class UserServiceStub {
  saveUser(userDetails) { return Observable.of({success: true, message: 'Added successfully.'})}
}

class RouterStub {
  navigate(arr) { return arr; }
}

function saveUser() {
  return {success: true, message: 'Added successfully.'}
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UserService;
  let router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
       ],
      providers: [
        { provide : UserService , useClass : UserServiceStub},
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
    userService = TestBed.get(UserService);
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('submitting a successful form and route to login', () => {
    const spy = spyOn(router, 'navigate');
    component.createForm();
    component.userForm.controls['email'].setValue('test@test.com');
    component.userForm.controls['username'].setValue('test');
    component.userForm.controls['password'].setValue('123456789');
    expect(component.userForm.valid).toBeTruthy();

    component.signup();
    expect(component.userDetails.email).toBe('test@test.com');
    expect(component.userDetails.username).toBe('test');
    expect(component.userDetails.password).toBe('123456789');
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('/login');
  });
});
