import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { convertToParamMap, ParamMap , ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

class UserServiceStub {
  getData() { return 'stub'; }
}

class AuthenticationServiceStub {
  login() { return Observable.of({ name: 'test' , email: 'test@test.com' , token: '2aereeeeeeeffffffff'}); }
}

class RouterStub {
  navigate(arr) { return arr; }
}

class ActivatedRouteStub {
  private subject: Subject<any>;
  private _testParamMap: ParamMap;
  private snapshot = { queryParams : {returnUrl: '/dashboard'}}
  constructor() {
    this.subject = new Subject();
  }

  sendParameters(params: {}) {
    this.subject.next(convertToParamMap(params)); // emitting data
  }

  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }
  get paramMap() {
    return this.subject.asObservable();
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRoute;
  let router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceStub
        },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    fixture.detectChanges();

  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should successfully login', async(() => {
    const spy = spyOn(router, 'navigate');

    component.createForm();
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('test');
    component.login();
    expect(component.loginDetails.password).toBe('test');
    expect(component.loginDetails.email).toBe('test@test.com');
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('/dashboard');
  }));

});
