import { Injectable } from '@angular/core';
import {Category, Client} from "../data";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createAuthorizationHeader} from "../utils/headers";
import {dns} from "../../global.config";

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  clients: Client[] = [];

  constructor(private _http: HttpClient) { }

  findAllClientServices(): Observable<Client[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Client[]>(dns + 'client', {headers: headers});
  }
  add(client: Client): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'client/add' , client, {headers: headers});
  }

  update(client: Client): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'client/update' , client , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'client/delete/' + id , { headers: headers });
  }
  findClientById(id: number): Observable<Client> {
    const headers = createAuthorizationHeader();
    return this._http.get<Client>( dns + 'client/' + id , { headers: headers });
  }
  loadAllClients() {
    this.findAllClientServices().subscribe(client => {
      this.clients = client;
    }, () => {});
  }
}
