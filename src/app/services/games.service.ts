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
  screenshots: string[];
  purchaseUrl: string;
}

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getNewReleasesGames(): Observable<Game[]> {
    return this.http.get<Game[]>('assets/jsons/newReleasesGames.json');
  }
  getUpcomingReleasesGames(): Observable<Game[]> {
    return this.http.get<Game[]>('assets/jsons/upcomingReleasesGames.json');
  }
  getTop100Games(): Observable<Game[]> {
    return this.http.get<Game[]>('assets/jsons/top100Games.json');
  }
  getPsPlusGames(): Observable<Game[]> {
    return this.http.get<Game[]>('assets/jsons/newPsPlusGames.json');
  }
  getQuizGames(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>('assets/jsons/quizGames.json');
  }
}
