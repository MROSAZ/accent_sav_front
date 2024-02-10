import { Injectable } from '@angular/core';
import {Category} from '../data';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {HttpClient} from '@angular/common/http';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  color: any;
  categories: Category[] = [];
  constructor(private _http: HttpClient) { }
  findAllCategoryServices(): Observable<Category[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Category[]>(dns + 'category', {headers: headers});
  }
  addCategoryService(category: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'category/add' , category, {headers: headers});
  }
  updateCategoryService(category: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'category/update' , category , { headers: headers });
  }
  deleteCategoryService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'category/delete/' + id , { headers: headers });
  }
  findCategoryById(id: number): Observable<Category> {
    const headers = createAuthorizationHeader();
    return this._http.get<Category>( dns + 'category/' + id , { headers: headers });
  }
  loadAllCategories() {
    this.findAllCategoryServices().subscribe(categories => {
      this.categories = categories;
    }, () => {});
  }
}
