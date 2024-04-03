import { Injectable } from '@angular/core';
import {Components} from '../data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  components: Components[] = [];
  constructor( private _http: HttpClient ) { }

  findAllComponentServices(): Observable<Components[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Components[]>(dns + 'component', {headers: headers});
  }

  add(component: Components): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'component/add' , component, {headers: headers});
  }
  update(component: Components): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'component/update' , component , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'component/delete/' + id , { headers: headers });
  }
  findComponentById(id: number): Observable<Components> {
    const headers = createAuthorizationHeader();
    return this._http.get<Components>( dns + 'component/' + id , { headers: headers });
  }
  findComponentByIdModel(id: number): Observable<Components[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Components[]>( dns + 'component/model/' + id , { headers: headers });
  }
  loadAllComponents() {
    this.findAllComponentServices().subscribe(components => {
      this.components = components;
    }, () => {});
  }
}
