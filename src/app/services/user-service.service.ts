import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user';
import { Response, RequestOptions, RequestOptionsArgs, Headers, Http } from '@angular/http';


import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

    constructor(private http: Http, @Inject('BaseURL') private BaseURL) { }

    saveUser(data) {
        return this.http.post(`${this.BaseURL}/auth/signup`, data).map((response: Response) => response);
    }

    updateUser(data, options?: RequestOptionsArgs) {
        return this.http.put(`${this.BaseURL}/user/update`, data, this.addJwt(options)).map((response: Response) => response);
    }

    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.token);
        }

        return options;
    }
}
