import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardModel} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ModelCardService {

  constructor( private _http: HttpClient ) { }

  models: CardModel[] = [];

  findAllModelsServices(): Observable<CardModel[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<CardModel[]>(dns + 'card-model', {headers: headers});
  }

  add(cardModel: CardModel): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'card-model/add' , cardModel, {headers: headers});
  }
  update(cardModel: CardModel): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'card-model/update' , cardModel , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'card-model/delete/' + id , { headers: headers });
  }
  findCardById(id: number): Observable<CardModel> {
    const headers = createAuthorizationHeader();
    return this._http.get<CardModel>( dns + 'card-model/' + id , { headers: headers });
  }
  loadAllCarModel() {
    this.findAllModelsServices().subscribe(cardModel => {
      this.models = cardModel;
    }, () => {});
  }
}
