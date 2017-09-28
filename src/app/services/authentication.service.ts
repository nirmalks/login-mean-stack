import { Injectable , Inject } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient , HttpParams } from '@angular/common/http';
@Injectable()
export class AuthenticationService {
  user: any;
	isLoggedIn: boolean = false; 
  redirectUrl: string ;
  constructor(private http: HttpClient , @Inject('BaseURL') private BaseURL) { }

login(userObj) {

      return this.http.post(`${this.BaseURL}/auth/login`,userObj)
      .map((response) => {
        console.log("isnide user auth service");
        // authenticate the login if there's valid jwt token in the response
        this.user = response;
		console.log(this.user);
      console.log(this.user.token);
      if(this.user && this.user.token) {
        localStorage.setItem('currentUser', this.user);
        this.isLoggedIn = true;
      }
    return this.user;
    });
}
}
