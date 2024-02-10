import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SousCategory} from "../data";
import {createAuthorizationHeader} from "../utils/headers";
import {dns} from "../../global.config";

@Injectable({
  providedIn: 'root',
})
export class TitleSuggestionService {

  constructor(private _http: HttpClient) {
  }

  findAllTitleSuggestionServices(): Observable<any[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<any[]>(dns + 'title_seggestion', {headers: headers});
  }

  addTitleSuggestionService(subCategories: any): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'title_seggestion/add', subCategories, {headers: headers});
  }

  updateTitleSuggestionService(subCategories: any): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put(dns + 'title_seggestion/update', subCategories, {headers: headers});
  }

  deleteTitleSuggestionService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete(dns + 'title_seggestion/delete/' + id, {headers: headers});
  }

  findTitleSuggestionById(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'title_seggestion/' + id, {headers: headers});
  }
}
