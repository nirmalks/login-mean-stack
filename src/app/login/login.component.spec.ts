import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

class UserServiceStub {
  getData() { return 'stub'; }
}

class AuthenticationServiceStub {
  getData() { return 'stub'; }
}

class RouterStub {
  navigateByUrl() { }
}


class ActivatedRouteStub {
  private subject: Subject<any>;

  constructor() {
    this.subject = new Subject();
  }

  sendParameters(params: {}) {
    this.subject.next(convertToParamMap(params)); // emitting data
  }

  get paramMap() {
    return this.subject.asObservable();
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRoute;
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
