import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Status} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';
import {User} from '../../authenification/credentials';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatusService {

  Status: Status[] = [];

  constructor(private _http: HttpClient) {
  }

  findAllStatusService(): Observable<Status[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Status[]>(dns + 'status', {headers: headers});
  }
  findStatusById(id: number): Observable<Status> {
    const headers = createAuthorizationHeader();
    return this._http.get<Status>(dns + 'status/' + id, {headers: headers});
  }
}
