import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Game {
  title: string;
  img: string;
  video: string;
  text: string;
  qualification: number;
  release: string;
  consoles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getTop100Games(): Observable<Game[]> {
    return this.http.get<any[]>('assets/jsons/top100.json');
  }
  getNewReleases(): Observable<Game[]> {
    return this.http.get<any[]>('assets/jsons/newReleases.json');
  }
}
