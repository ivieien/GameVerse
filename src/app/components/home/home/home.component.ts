import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentNewsIndex: number = 0;
  buttonsHome: any[] | undefined;
  top100Games: any[] | undefined;
  newsItems: any[] | undefined;
  currentGameIndex: number = 0;
  titleTop100: string = 'Descubre los Mejores Juegos'
  descriptionTop100: string = 'Explora nuestra selección de los TOP 100 juegos mejor valorados.'

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getButtons().subscribe(data => {
      this.buttonsHome = data;
    });
    this.homeService.getTop100Games().subscribe(data => {
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

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
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
