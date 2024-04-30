import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getButtons(): Observable<any[]> {
    return this.http.get<any[]>('assets/jsons/buttonsHome.json');
  }
  getHomeNews(): Observable<any[]> {
    return this.http.get<any[]>('assets/jsons/newsHome.json');
  }
}
