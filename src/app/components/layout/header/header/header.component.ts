import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  links: string[] = ['Inicio', 'Juegos', 'Noticias', 'Videos', 'Analisis y reseñas', 'Lo ultimo'];

  menuAbierto: boolean = false;

  MostrarMenuDesplegable() {
    this.menuAbierto = !this.menuAbierto;
  }
}
