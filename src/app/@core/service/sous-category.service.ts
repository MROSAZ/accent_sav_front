import { Injectable } from '@angular/core';
import {Category, SousCategory} from '../data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class SousCategoryService {
  constructor(private _http: HttpClient) { }
  findAllSubCategoryServices(): Observable<SousCategory[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<SousCategory[]>(dns + 'sub_category', {headers: headers});
  }
  addSubCategoryService(subCategories: SousCategory): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'sub_category/add' , subCategories, {headers: headers});
  }
  updateSubCategoryService(subCategories: SousCategory): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'sub_category/update' , subCategories , { headers: headers });
  }
  deleteSubCategoryService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'sub_category/delete/' + id , { headers: headers });
  }
  findSousCategoryById(id: number): Observable<SousCategory> {
    const headers = createAuthorizationHeader();
    return this._http.get<SousCategory>( dns + 'sub_category/' + id , { headers: headers });
  }
  findSousCategoryByCategoryId(id: number): Observable<SousCategory[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<SousCategory[]>( dns + 'sub_category/category/' + id , { headers: headers });
  }
}

