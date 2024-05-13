import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) {}

  readReviews(): Observable<any> {
    return this.http.get<any>('assets/jsons/reviews.json');
  }
  saveReviews(data: any): Observable<any> {
    return this.http.put('assets/jsons/reviews.json', data);
  }
}