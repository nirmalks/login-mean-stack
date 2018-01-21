import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user';
import { HttpClient , HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private http: HttpClient, @Inject('BaseURL') private BaseURL) { }

    saveUser(data) {
        return this.http.post(`${this.BaseURL}/auth/signup`, data).map((response: HttpResponse<any>) => response);
    }

    updateUser(data, options?: any) {
        return this.http.put(`${this.BaseURL}/user/update`, data, {headers : this.addJwt(options)}).map((response: HttpResponse<any>) => response);
    }

    private addJwt(options: any) {
        const headers = new HttpHeaders();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.set('Authorization', 'Bearer ' + currentUser.token);
        }

        return headers;
    }
}
