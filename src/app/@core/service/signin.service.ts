import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Credentials, User } from '../../authenification/credentials';
import { dns } from '../../global.config';
import { createAuthorizationHeader } from '../utils/headers';
import {ResetData} from '../data';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  accounts: User[] = null;
  currentUser: User = null;

  constructor(private _http: HttpClient, private helper: JwtHelperService) { }

  login(credentials: Credentials): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http
      .post(dns + 'authenticate ', credentials, { headers: headers });
  }

  logout(): Observable<any> {
    this.currentUser = this.helper.decodeToken(localStorage.getItem('token')).user;
    const headers = createAuthorizationHeader();
    return this._http
      .post(dns + 'logout' + this.currentUser.id, {}, { headers: headers });
  }

  getCurrentUser() {
    this._http.get(`${dns}users/me`, { headers: createAuthorizationHeader() }).subscribe(
      (resp: any) => { this.currentUser = resp; },
    );
  }

  refreshToken(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(dns + 'users/refreshtoken', {
      refreshToken: token,
    }, { headers: headers });
  }
  resetPassword(data: ResetData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.put(dns + 'user/reset-password', data, {headers: headers});
  }
  getResetPasswordLink(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post(dns + 'user/request-reset-link', email, { headers: headers });
  }
}
