import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';
import {ComponentsBackup} from '../data';

@Injectable({
  providedIn: 'root',
})
export class ComponentBuckupService {

  constructor( private _http: HttpClient ) { }
  components: ComponentsBackup[] = [];
  findAllComponentServices(): Observable<ComponentsBackup[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<ComponentsBackup[]>(dns + 'component-category', {headers: headers});
  }

  add(component: ComponentsBackup): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'component-category/add' , component, {headers: headers});
  }
  update(component: ComponentsBackup): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'component-category/update' , component , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'component-category/delete/' + id , { headers: headers });
  }
  findComponentById(id: number): Observable<ComponentsBackup> {
    const headers = createAuthorizationHeader();
    return this._http.get<ComponentsBackup>( dns + 'component-category/' + id , { headers: headers });
  }
  loadAllComponents() {
    this.findAllComponentServices().subscribe(components => {
      this.components = components;
    }, () => {});
  }
}
