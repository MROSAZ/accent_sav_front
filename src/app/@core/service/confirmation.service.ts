import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {

  constructor(private _http: HttpClient) { }
  confirmation(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(dns + 'user/confirmation/' + token, {headers: headers});
  }
}
