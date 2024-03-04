import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  links: string[] = ['Inicio', 'Juegos', 'Noticias', 'Videos', 'Analisis y reseñas', 'Lo ultimo'];

  SidebarAbierto: boolean = false;

  MostrarSidebar() {
    this.SidebarAbierto = !this.SidebarAbierto;
  }
}
