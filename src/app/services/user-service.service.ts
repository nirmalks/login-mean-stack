import { Injectable , Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user';
import { Response } from '@angular/http';
import { HttpClient , HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

  constructor(private http: HttpClient , @Inject('BaseURL') private BaseURL) { }

  saveUser(data){
     return this.http.post(`${this.BaseURL}/auth/signup`, data);
  }

  loginUser(data) {
    return this.http.post(`${this.BaseURL}/auth/login`, data)
      .map(response => {
       let user = response;
       console.log(response);
       if(user) {
         localStorage.setItem('currentUser',JSON.stringify(user));
       }
       return user;
     });;
  }
}