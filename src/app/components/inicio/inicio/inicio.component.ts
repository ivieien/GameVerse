import { Component } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  loremIpsumText: string = loremIpsum({
    count: 2,
    units: 'paragraphs',
  });
  currentNewsIndex: number = 0;
  buttonsHome: any[] | undefined;
  top100Games: any[] | undefined;
  newsItems: any[] | undefined;

  currentGameIndex: number = 0;

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
  
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
}
