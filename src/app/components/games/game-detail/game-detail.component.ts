import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import i18next from 'i18next';
import { GamesService } from 'src/app/services/games.service';

interface Game {
  title: string;
  img: string;
  video: string;
  text: string;
  qualification: number;
  release: string;
  consoles: string[];
}
@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  currentLanguage: string = 'es';

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.currentLanguage= i18next.language;
    
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.gamesService.getNewReleases().subscribe((data: Game[]) => {
          this.game = data.find(game => game.title === title) || null;
        });
      }
    });
  }

}