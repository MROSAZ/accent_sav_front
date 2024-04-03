import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelComponent} from '../data';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ModelComponentService {

  constructor( private _http: HttpClient ) { }
  modelComponents: ModelComponent[] = [];


  findAllModelsComponentsServices(): Observable<ModelComponent[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<ModelComponent[]>(dns + 'model-component', {headers: headers});
  }
  add(modelComponent: ModelComponent): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'model-component/add' , modelComponent, {headers: headers});
  }
  update(modelComponent: ModelComponent): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'model-component/update' , modelComponent , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'model-component/delete/' + id , { headers: headers });
  }
  findModelComponentById(id: number): Observable<ModelComponent> {
    const headers = createAuthorizationHeader();
    return this._http.get<ModelComponent>( dns + 'model-component/' + id , { headers: headers });
  }
  findModelComponentByIdModel(id: number): Observable<ModelComponent[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<ModelComponent[]>( dns + 'model-component/byidmodel/' + id , { headers: headers });
  }
  loadAllModelComponents() {
    this.findAllModelsComponentsServices().subscribe(modelComponents => {
      this.modelComponents = modelComponents;
    }, () => {});
  }
}
