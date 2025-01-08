import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import i18next from 'i18next';

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

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  currentLanguage: string = 'es';
  showLightbox: boolean = false;
  currentImage: number = 0;

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
        this.gamesService.getNewReleasesGames().subscribe((newReleasesData: Game[]) => {
          const gameFromNewReleases = newReleasesData.find(game => this.formatURL(game.title) === title);
          if (gameFromNewReleases) {
            this.game = gameFromNewReleases;
          } else {
            this.gamesService.getUpcomingReleasesGames().subscribe((upcomingReleasesData: Game[]) => {
              const gameFromUpcomingReleases = upcomingReleasesData.find(game => this.formatURL(game.title) === title);
              if (gameFromUpcomingReleases) {
                this.game = gameFromUpcomingReleases;
              } else {
                this.gamesService.getTop100Games().subscribe((top100Data: Game[]) => {
                  const gameFromTop100 = top100Data.find(game => this.formatURL(game.title) === title);
                  if (gameFromTop100) {
                    this.game = gameFromTop100;
                  } else {
                    this.gamesService.getPsPlusGames().subscribe((psPlusData: Game[]) => {
                      const gameFromPsPlus = psPlusData.find(game => this.formatURL(game.title) === title);
                      this.game = gameFromPsPlus || null;
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  getRatingClass(qualification: number | null | undefined): string {
    if (qualification == null) {
      return 'tbdRating';
    } else if (qualification >= 7.5) {
      return 'goodRating';
    } else if (qualification >= 6.0) {
      return 'mediumRating';
    } else {
      return 'badRating';
    }
  }

  redirectToPurchase(): void {
    if (this.game && this.game.purchaseUrl) {
      window.open(this.game.purchaseUrl);
    } else {
      console.error('No se encontró una URL de compra para este juego.');
    }
  }

  openLightbox(index: number): void {
    this.currentImage = index;
    this.showLightbox = true;
  }

  closeLightbox(): void {
    this.showLightbox = false;
  }

  prevImage(): void {
    if (this.game && this.game.screenshots.length > 0) {
      this.currentImage = (this.currentImage - 1 + this.game.screenshots.length) % this.game.screenshots.length;
    }
  }

  nextImage(): void {
    if (this.game && this.game.screenshots.length > 0) {
      this.currentImage = (this.currentImage + 1) % this.game.screenshots.length;
    }
  }
}