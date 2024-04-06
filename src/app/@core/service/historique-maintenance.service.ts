import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoriqueMaintenance} from '../data';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueMaintenanceService {

  historiqueMaintenances: HistoriqueMaintenance[] = [];


  constructor(private _http: HttpClient) { }

  findAll(): Observable<HistoriqueMaintenance[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<HistoriqueMaintenance[]>(dns + 'historique-maintenance', {headers: headers});
  }

  add(historiqueMaintenance: HistoriqueMaintenance): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'historique-maintenance/add' , historiqueMaintenance, {headers: headers});
  }

  loadAllHistoriqueMaintenances() {
    this.findAll().subscribe( historiqueMaintenances => {
      this.historiqueMaintenances = historiqueMaintenances;
    }, () => {});
  }}
