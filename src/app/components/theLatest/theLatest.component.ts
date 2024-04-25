import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-theLatest',
  templateUrl: './theLatest.component.html',
  styleUrls: ['./theLatest.component.scss']
})
export class TheLatestComponent {
  newReleasesGames: any[] | undefined;
  startIndex: number = 0;
  endIndex: number = 7;
  groupSize: number = 8;

  constructor(private gamesService: HomeService) { }

  ngOnInit(): void {
    this.gamesService.getTop100Games().subscribe(data => {
      this.newReleasesGames = data;
    });
  }

  get visibleGames(): any[] {
    if (!this.newReleasesGames) return [];
    return this.newReleasesGames.slice(this.startIndex, this.endIndex + 1);
  }

  get translateValue(): string {
    const itemWidth = 100 / this.groupSize;
    const offset = (itemWidth * (this.startIndex % this.groupSize));
    return `calc(-50% + ${offset}%)`; 
  }

  nextGames() {
    if (this.endIndex < this.newReleasesGames!.length - 1) {
      this.startIndex++;
      this.endIndex++;
    }
  }

  prevGames() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.endIndex--;
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
