import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private http: HttpClient) {}

  getGames2024(): Observable<any> {
    return this.http.get<any>('assets/jsons/gamesTable_2024.json');
  }
  getGames2023(): Observable<any> {
    return this.http.get<any>('assets/jsons/gamesTable_2023.json');
  }
  getGames2022(): Observable<any> {
    return this.http.get<any>('assets/jsons/gamesTable_2022.json');
  }
}
