import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { baseUrl } from '../shared/baseurl';

@Injectable()
export class GoogleAuthService {

  constructor(private http: Http) {

  }
}
