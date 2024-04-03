import { Injectable } from '@angular/core';
import {Cards, CardsAddDto, CardsStock} from '../data';
import {Observable} from 'rxjs';
import {createAuthorizationHeader} from '../utils/headers';
import {dns} from '../../global.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {

  constructor( private _http: HttpClient ) { }


  cards: Cards[] = [];

  findAllCardsServices(): Observable<Cards[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Cards[]>(dns + 'card', {headers: headers});
  }
  getCardsByIdClient(idClient: number): Observable<Cards[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<Cards[]>(dns + 'card/client/' + idClient, {headers: headers});
  }
  getCardStock(): Observable<CardsStock[]> {
    const headers = createAuthorizationHeader();
    return this._http.get<CardsStock[]>(dns + 'card/stock', {headers: headers});
  }

  add(cardsAddDto: CardsAddDto): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.post(dns + 'card/add' , cardsAddDto, {headers: headers});
  }
  update(cards: Cards[]): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.put( dns + 'card/update' , cards , { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = createAuthorizationHeader();
    return this._http.delete( dns + 'card/delete/' + id , { headers: headers });
  }
  findCardById(id: number): Observable<Cards> {
    const headers = createAuthorizationHeader();
    return this._http.get<Cards>( dns + 'card/' + id , { headers: headers });
  }
  loadAllCards() {
    this.findAllCardsServices().subscribe(cards => {
      this.cards = cards;
    }, () => {});
  }
}
