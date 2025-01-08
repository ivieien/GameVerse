import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

interface Game {
  title: string;
  img: string;
  video: string;
  text: string;
  qualification?: number | null;
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

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})

export class GamesComponent {
  newReleasesGames: Game[] | undefined;
  upcomingReleasesGames: Game[] | undefined;
  top100Games: Game[] | undefined;
  psPlusGames: Game[] | undefined;
  startIndex: { [key: string]: number } = { newReleases: 0, upcomingReleases: 0, top100: 0, psPlus: 0 };
  endIndex: { [key: string]: number } = { newReleases: 7, upcomingReleases: 7, top100: 7, psPlus: 7 };

  quizQuestions: Quiz[] = [];
  currentQuizQuestion: Quiz | undefined;
  selectedOption: string | null = null;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getNewReleasesGames().subscribe((data) => {
      this.newReleasesGames = data;
    });
    this.gamesService.getUpcomingReleasesGames().subscribe((data) => {
      this.upcomingReleasesGames = data;
    });
    this.gamesService.getQuizGames().subscribe((data) => {
      this.quizQuestions = data;
      this.selectRandomQuizQuestion();
    });
    this.gamesService.getTop100Games().subscribe((data) => {
      this.top100Games = data;
    });
    this.gamesService.getPsPlusGames().subscribe((data) => {
      this.psPlusGames = data;
    });

  }

  formatURL(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  getVisibleGames(type: string): Game[] {
    const startIndex = this.startIndex[type];
    const endIndex = this.endIndex[type];
    if (type === 'newReleases') {
      if (!this.newReleasesGames) return [];
      return this.newReleasesGames.slice(startIndex, endIndex + 1);
    } else if (type === 'upcomingReleases') {
      if (!this.upcomingReleasesGames) return [];
      return this.upcomingReleasesGames.slice(startIndex, endIndex + 1);
    } else if (type === 'top100') {
      if (!this.top100Games) return [];
      return this.top100Games.slice(startIndex, endIndex + 1);
    } else if (type === 'psPlus') {
      if (!this.psPlusGames) return [];
      return this.psPlusGames.slice(startIndex, endIndex + 1);
    } else {
      return [];
    }
  }

  navigateCarousel(type: string, direction: string) {
    const startIndex = this.startIndex[type];
    const endIndex = this.endIndex[type];

    if (direction === 'next') {
      if (endIndex <= (this as any)[`${type}Games`].length - 1) {
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

  getRatingText(qualification: number): string {
    if (qualification >= 7.5) {
      return "Recomendado";
    } else if (qualification >= 6.0) {
      return "Promedio";
    } else {
      return "No recomendado";
    }
  }

  selectRandomQuizQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.quizQuestions.length);
    this.currentQuizQuestion = this.quizQuestions[randomIndex];
  }

  checkAnswer(option: string): void {
    this.selectedOption = option;
  }
}
