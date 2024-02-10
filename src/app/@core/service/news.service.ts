import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  image: any = '';
  news: any[] = [];
  constructor(private _http: HttpClient) { }
  findAllNewsServices(): Observable<News[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<News[]>(dns + 'news', {headers: headers});
  }
  addNewsService(news: News): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'news/add' , news, {headers: headers});
  }
  updateNewsService(news: News): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'news/update' , news , { headers: headers });
  }
  deleteNewsService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'news/delete/' + id , { headers: headers });
  }
  findNewsByIdService(id: number): Observable<News> {
    const headers = createAuthorizationHeader();
    return this._http.get<News>( dns + 'news/' + id , { headers: headers });
  }
}
