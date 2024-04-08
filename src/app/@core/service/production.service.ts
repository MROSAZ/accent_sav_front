import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, ProdHistorique, Production} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {

  production: Production[] = [];

  constructor(private _http: HttpClient) { }

  findAll(): Observable<Production[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Production[]>(dns + 'production', {headers: headers});
  }
  findAllHistorique(): Observable<ProdHistorique[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<ProdHistorique[]>(dns + 'production/gethistorique', {headers: headers});
  }

  add(production: Production): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'production/add' , production, {headers: headers});
  }

  loadAllProductions() {
    this.findAll().subscribe(production => {
      this.production = production;
    }, () => {});
  }
}
