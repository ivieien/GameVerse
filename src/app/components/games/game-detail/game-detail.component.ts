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

  formatURL(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  ngOnInit(): void {
    this.currentLanguage = i18next.language; 
    
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.gamesService.getNewReleases().subscribe((newReleasesData: Game[]) => {
          const gameFromNewReleases = newReleasesData.find(game => this.formatURL(game.title) === title);
          if (gameFromNewReleases) {
            this.game = gameFromNewReleases;
          } else { 
            this.gamesService.getTop100Games().subscribe((top100Data: Game[]) => {
              const gameFromTop100 = top100Data.find(game => this.formatURL(game.title) === title);
              this.game = gameFromTop100 || null;
            });
          }
        });
      }
    }); 
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