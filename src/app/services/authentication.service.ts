import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  user: any;
  isLoggedIn: boolean = false;
  redirectUrl: string;
  constructor(private http: HttpClient, @Inject('BaseURL') private BaseURL) { }

  login(userObj) {
    return this.http.post(`${this.BaseURL}/auth/login`, userObj)
      .map((response) => {
        this.user = response;
        if (this.user && this.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.isLoggedIn = true;
        }
        return this.user;
      });
  }
}
