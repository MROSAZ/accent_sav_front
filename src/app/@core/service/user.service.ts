import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createAuthorizationHeader } from '../utils/headers';
import { User } from '../../authenification/credentials';
import { dns } from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users: User[];
  public UserLoaded$: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) { }

  findAllUsersService(): Observable<User[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<User[]>(dns + 'user', { headers: headers });
  }
  addUserService(user: User): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'user/add', user, { headers: headers });
  }
  updateUserService(user: User): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put(dns + 'user/update', user, { headers: headers });
  }
  deleteUserService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete(dns + 'user/delete/' + id, { headers: headers });
  }

  findUserById(id: number): Observable<User> {
    const headers = createAuthorizationHeader();
    return this._http.get<User>(dns + 'user/' + id, {headers: headers});
  }

  getUserAgeStats(): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'user/userstats' , {headers: headers});
  }

  loadAllUsers() {
    this.findAllUsersService().subscribe(users => {
      this.users = users;
      this.UserLoaded$.emit();
    }, () => {
    });
  }

}
