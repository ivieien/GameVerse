import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { GamesService } from 'src/app/services/games.service';
import i18next from 'i18next';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  newsItems: any[] | undefined;
  currentNewsIndex: number = 0;
  top100Games: any[] | undefined;
  currentGameIndex: number = 0;
  buttonsHome: any[] | undefined;
  currentLanguage: string = 'es';
  
  constructor(
    private homeService: HomeService,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = i18next.language;

    this.homeService.getButtons().subscribe(data => {
      this.buttonsHome = data;
    });
    this.gamesService.getTop100Games().subscribe(data => {
      this.top100Games = data;
    });
    this.homeService.getHomeNews().subscribe(data => {
      this.newsItems = data;
    });
  }

  nextNews() {
    this.currentNewsIndex = (this.currentNewsIndex + 1) % this.newsItems!.length;
  }
  prevNews() {
    this.currentNewsIndex = (this.currentNewsIndex - 1 + this.newsItems!.length) % this.newsItems!.length;
  }
  nextGames() {
    this.currentGameIndex = (this.currentGameIndex + 4) % this.top100Games!.length;
  }
  prevGames() {
    this.currentGameIndex = (this.currentGameIndex - 4 + this.top100Games!.length) % this.top100Games!.length;
  }

  formatURL(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  getRatingClass(qualification: number): string {
    if (qualification >= 8.0) {
      return 'goodRating';
    } else if (qualification >= 6.0) {
      return 'mediumRating';
    } else {
      return 'badRating';
    }
  }
}
