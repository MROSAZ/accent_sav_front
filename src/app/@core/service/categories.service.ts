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
    return this._http.get<Category[]>(dns + 'category_component', {headers: headers});
  }
  add(category: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'category_component/add' , category, {headers: headers});
  }
  update(category: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'category_component/update' , category , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'category_component/delete/' + id , { headers: headers });
  }
  findCategoryById(id: number): Observable<Category> {
    const headers = createAuthorizationHeader();
    return this._http.get<Category>( dns + 'category_component/' + id , { headers: headers });
  }
  loadAllCategories() {
    this.findAllCategoryServices().subscribe(categories => {
      this.categories = categories;
    }, () => {});
  }
}
