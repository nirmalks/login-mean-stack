import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { baseUrl } from '../shared/baseurl';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: "BaseURL", useValue: baseUrl }]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
