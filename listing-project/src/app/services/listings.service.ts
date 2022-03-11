import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  private url = `${environment.apiUrl}/listings`;

  constructor(private http: HttpClient) {
  }

  getListings$(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.url);
  }

  getListing$(id: number): Observable<Listing> {
    const url = `${this.url}/${id}`;

    return this.http.get<Listing>(url);
  }

  postListing$(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(this.url, listing);
  }

  putListing$(listing: Listing): Observable<Listing> {
    const url = `${this.url}/${listing.id}`;

    return this.http.put<Listing>(url, listing);
  }

  deleteListing$(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url);
  }
}
