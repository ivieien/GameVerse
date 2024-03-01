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
  links: string[] = ['Inicio', 'Juegos', 'Noticias', 'Videos', 'Analisis y reseñas', 'Lo ultimo'];
  searchExpanded: boolean = false;

  menuAbierto: boolean = false;

  MostrarMenuDesplegable() {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }
}
