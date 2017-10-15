import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Http } from '@angular/http';
@Injectable()
export class AuthenticationService {
  user: any;
  isLoggedIn: boolean = false;
  redirectUrl: string;
  constructor(private http: Http, @Inject('BaseURL') private BaseURL) { }

  login(userObj) {
    return this.http.post(`${this.BaseURL}/auth/login`, userObj)
      .map((response) => {
        // authenticate the login if there's valid jwt token in the response
        this.user = response.json();
        if (this.user && this.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.isLoggedIn = true;
        }
        return this.user;
      });
  }
}
