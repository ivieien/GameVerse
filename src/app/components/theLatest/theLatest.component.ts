import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-theLatest',
  templateUrl: './theLatest.component.html',
  styleUrls: ['./theLatest.component.scss']
})
export class TheLatestComponent {
  top100Games: any[] | undefined;
  newReleasesGames: any[] | undefined;
  startIndex: { [key: string]: number } = { newReleases: 0, top100: 0 };
  endIndex: { [key: string]: number } = { newReleases: 7, top100: 7 };
  groupSize: number = 8;

  constructor(private gamesService: GamesService) { }

  formatURL(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  } 
  
  ngOnInit(): void {
    this.gamesService.getTop100Games().subscribe(data => {
      this.top100Games = data;
    });
    this.gamesService.getNewReleases().subscribe(data => {
      this.newReleasesGames = data;
    });
  }

  getVisibleGames(type: string): any[] {
    const startIndex = this.startIndex[type];
    const endIndex = this.endIndex[type];
    if (type === 'newReleases') {
      if (!this.newReleasesGames) return [];
      return this.newReleasesGames.slice(startIndex, endIndex + 1);
    } else if (type === 'top100') {
      if (!this.top100Games) return [];
      return this.top100Games.slice(startIndex, endIndex + 1);
    } else {
      return [];
    }
  }
  get translateValue(): string {
    const itemWidth = 100 / this.groupSize;
    const startIndex = this.startIndex['newReleases']; 
    const offset = (itemWidth * (startIndex % this.groupSize));
    return `calc(-50% + ${offset}%)`; 
  }
  
  navigateCarousel(type: string, direction: string) {
    const startIndex = this.startIndex[type];
    const endIndex = this.endIndex[type];

    if (direction === 'next') {
      if (endIndex < (this as any)[`${type}Games`].length - 1) {
        this.startIndex[type]++;
        this.endIndex[type]++;
      }
    } else if (direction === 'prev') {
      if (startIndex > 0) {
        this.startIndex[type]--;
        this.endIndex[type]--;
      }
    }
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
