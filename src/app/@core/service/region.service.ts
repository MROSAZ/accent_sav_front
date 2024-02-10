import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Region} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class RegionService {

  regions: any[] = [];
  public regionSelected: any[] = [];
  constructor(private _http: HttpClient) { }
  findAllRegionServices(): Observable<Region[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Region[]>(dns + 'region', {headers: headers});
  }
  addRegionService(subCategories: Region): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'region/add' , subCategories, {headers: headers});
  }
  updateRegionService(subCategories: Region): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'region/update' , subCategories , { headers: headers });
  }
  deleteRegionService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'region/delete/' + id , { headers: headers });
  }
  findRegionByIdService(id: number): Observable<Region> {
    const headers = createAuthorizationHeader();
    return this._http.get<Region>( dns + 'region/' + id , { headers: headers });
  }
}
