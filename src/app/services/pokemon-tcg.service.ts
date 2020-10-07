import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Card, FilterOptions } from '../interfaces/card.interface';

export interface AllCardsResponse { cards: Card[]; }
export interface CardByIdResponse { card: Card; }

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {

  constructor(private http: HttpClient) { }

  getPokemonCards(filterOptions: FilterOptions): Observable<AllCardsResponse> {
    const url = new URL(`${environment.endpoint}/cards?supertype=Pok%C3%A9mon`);

    if (filterOptions) {
      Object.entries(filterOptions)
        .filter(([_, value]) => (Array.isArray(value)) ? value.length > 0 : value)
        .map(([name, value]) => ({name, value}))
        .forEach((item: {name: string, value: string}) => url.searchParams.append(item.name, item.value));
    }
    return this.http.get<AllCardsResponse>(url.href);
  }

  getCardById(id: string): Observable<CardByIdResponse> {
    return this.http.get<CardByIdResponse>(`${environment.endpoint}/cards/${id}`);
  }
}
