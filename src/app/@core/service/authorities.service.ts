import { Injectable } from '@angular/core';
import {Authorities} from '../data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';
import {User} from '../../authenification/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthoritiesService {

  authorities: Authorities[] = [];
  constructor(private _http: HttpClient) { }

  findAllAuthoritiesService(): Observable<Authorities[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Authorities[]>(dns + 'authorities', { headers: headers });
  }
  addAuthorityService(user: User): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'authorities/add', user, { headers: headers });
  }
  updateAuthorityService(user: User): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put(dns + 'authorities/update', user, { headers: headers });
  }
  deleteAuthorityService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete(dns + 'authorities/delete/' + id, { headers: headers });
  }

  findauthorityById(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'authorities/' + id, {headers: headers});
  }

  loadAllAuthorities() {
    this.findAllAuthoritiesService().subscribe(authorities => {
      this.authorities = authorities;
    }, () => {
    });
  }
}
