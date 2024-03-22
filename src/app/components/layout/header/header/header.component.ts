import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('expandSearch', [
      state('collapsed', style({ width: '0' })),
      state('expanded', style({ width: '150px' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
      transition('expanded => collapsed', animate('300ms ease-in'))
    ])
  ]
})
export class HeaderComponent {
  searchExpanded: boolean = false;

  sidebarOpen: boolean = false;

  openSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }

  home: string = 'inicio';
  games: string = 'juegos';
  news: string = 'noticias';
  videos: string = 'videos';
  reviews: string = 'analisis y reseñas';
  theLatest: string = 'lo ultimo';
}
