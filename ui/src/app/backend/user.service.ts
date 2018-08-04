import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './service';


@Injectable()
export class UserService extends BackendService {

  apiUrl = environment.apiUrl + '/user';

  public isLoggedIn = false;
  public data: User;
  public redirectUrl: string;

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  get(): Observable<User> {
    if (this.checkLogin('auth') && this.data !== undefined) {
      console.log('already logged in:', this.data);
      return Observable.of(this.data);
    }
    console.log('fetching user from backend:', this.apiUrl);
    return this.http.get<User>(this.apiUrl, {
      responseType: "json"
    })
      .map(this.parseData)
      .catch(this.handleError);
  }

  public checkLogin(cookieName: string): boolean {
    this.isLoggedIn = document.cookie.indexOf(cookieName, 0) != -1;
    return this.isLoggedIn;
  }
}