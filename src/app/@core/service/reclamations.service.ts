import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../data';
import {Observable} from 'rxjs';
import {User} from '../../authenification/credentials';
import {createAuthorizationHeader, createAuthorizationHeaderRaw} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class ReclamationsService {

  reclamations: Ticket[] = [];
  constructor(private _http: HttpClient) { }

  findAllTicketsService(): Observable<Ticket[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Ticket[]>(dns + 'ticket', { headers: headers });
  }
  addTicketService(ticket: Ticket): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'ticket/add', ticket, { headers: headers });
  }
  updateTicketService(ticket: any): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put(dns + 'ticket/update', ticket, { headers: headers });
  }
  deleteTicketService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete(dns + 'ticket/delete/' + id, { headers: headers });
  }
  findTicketById(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'ticket/' + id, {headers: headers});
  }
  findTicketBySupervisorId(id: number): Observable<Ticket[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Ticket[]>(dns + 'ticket/supervisor/' + id, {headers: headers});
  }
  findTicketByAssignedId(id: number): Observable<Ticket[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Ticket[]>(dns + 'ticket/assigned/' + id, {headers: headers});
  }
  findTicketImageById(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'ticket/img/' + id,
      {headers: headers});
  }
  getTicketStatusStat(days: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'ticket/statsandstatus/' + days, {headers: headers});
  }
  findTicketMapService(): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'ticket/map', {headers: headers});
  }
  getStatByPeriodService(day: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>(dns + 'ticket/byperiod/' + day, {headers: headers});
  }

  getDailyTicketSummaryByStatusBetweenPeriod
  (id: number, type: string, startDate: number, endDate: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>
    (dns + 'ticket/summary/' + id + '/' + type + '/' + startDate + '/' + endDate, {headers: headers} );
  }
  getAvgTreatmentPeriodByUserInPeriod
  (id: number, type: string, startDate: number, endDate: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>
    (dns + 'ticket/avg/' + id + '/' + type + '/' + startDate + '/' + endDate, {headers: headers} );
  }
  getDailyTicketSummaryBySubCategoryBetweenPeriod
  (id: number, startDate: number, endDate: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>
    (dns + 'ticket/summarycategory/' + id + '/' + startDate + '/' + endDate, {headers: headers} );
  }
  getAvgTreatmentPeriodBySubCategoryInPeriod
  (id: number, startDate: number, endDate: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>
    (dns + 'ticket/avgcategory/' + id + '/' + startDate + '/' + endDate, {headers: headers} );
  }

  loadAllTickets() {
    this.findAllTicketsService().subscribe(tickets => {
      this.reclamations = tickets;
    }, () => {
    });
  }
}
