import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  numberUnreadNotification: number ;
  constructor(private _http: HttpClient) { }
  findNotificationByUserId(id: number): Observable<any[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<any[]>(dns + 'notification/user/' + id, {headers: headers});
  }
  findUnreadNotificationByIdUser(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'notification/count/' + id,
      {headers: headers});
  }
  updateNotification(notification: any): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put<any>(dns + 'notification/update', notification, {headers: headers});
  }
}
