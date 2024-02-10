import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Category, TicketMessages} from '../data';
import {HttpClient} from '@angular/common/http';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {

  ticketMessages: any[] = [];
  constructor(private _http: HttpClient) { }
  findAllTicketMessageServices(): Observable<TicketMessages[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<TicketMessages[]>(dns + 'ticket_message', {headers: headers});
  }
  addTicketMessageService(ticketMessage: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'ticket_message/add' , ticketMessage, {headers: headers});
  }
  updateTicketMessageService(ticketMessage: Category): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'ticket_message/update' , ticketMessage , { headers: headers });
  }
  deleteTicketMessageService(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'ticket_message/delete/' + id , { headers: headers });
  }
  findTicketMessageById(id: number): Observable<TicketMessages> {
    const headers = createAuthorizationHeader();
    return this._http.get<TicketMessages>( dns + 'ticket_message/' + id , { headers: headers });
  }
  findTicketMessageByIdTicket(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.get<any>( dns + 'ticket_message/ticket/' + id , { headers: headers });
  }
}
