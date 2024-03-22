import { Component } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';

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

  newsItems: { title: string }[] = [
    { title: 'Noticia 1' },
    { title: 'Noticia 2' },
    { title: 'Noticia 3' },
  ];

  nextNews() {
    this.currentNewsIndex = (this.currentNewsIndex + 1) % this.newsItems.length;
  }
  prevNews() {
    this.currentNewsIndex =
      (this.currentNewsIndex - 1 + this.newsItems.length) %
      this.newsItems.length;
  }

  topVideoGames: string[] = ['Videojuego 1', 'Videojuego 2', 'Videojuego 3'];

  currentGameIndex: number = 0;

  nextGame() {
    this.currentGameIndex =
      (this.currentGameIndex + 1) % this.topVideoGames.length;
  }

  prevGame() {
    this.currentGameIndex =
      (this.currentGameIndex - 1 + this.topVideoGames.length) %
      this.topVideoGames.length;
  }
}
