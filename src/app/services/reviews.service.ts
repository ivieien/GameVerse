import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getGamesAndColumns() {
    return {
      columns: ['ID', 'Título', 'Precio', 'Plataforma', 'Género', 'PEGI', 'Fecha de salida'],
      games: [
        { id: 1, title: 'Dragon\'s Legacy: Fire and Fury', price: 49.99, platform: 'PlayStation 5', genre: 'RPG de Fantasía', pegi: 16, releaseDate: '18/05/24' },
        { id: 2, title: 'Apocalyptic Fallout: New Era', price: 59.99, platform: 'Xbox Series X', genre: 'Aventura de Mundo Abierto', pegi: 18, releaseDate: '17/05/24' },
        { id: 3, title: 'Galactic Domination: Space Empires', price: 39.99, platform: 'Nintendo Switch', genre: 'Simulación de Estrategia', pegi: 10, releaseDate: '16/05/24' },
        { id: 4, title: 'Mystical Realms: Arcane Awakening', price: 54.99, platform: 'PC', genre: 'Aventura de Fantasía', pegi: 12, releaseDate: '15/05/24' },
        { id: 5, title: 'Epic Quest: Legends Unleashed', price: 49.99, platform: 'PlayStation 5', genre: 'Acción-Aventura', pegi: 16, releaseDate: '14/05/24' },
        { id: 6, title: 'Mechanical Mayhem: Robot', price: 44.99, platform: 'Xbox Series X', genre: 'Acción de Ciencia Ficción', pegi: 12, releaseDate: '13/05/24' },
        { id: 7, title: 'Lost World: Forgotten Realms', price: 49.99, platform: 'Nintendo Switch', genre: 'Rompecabezas de Aventura', pegi: 10, releaseDate: '12/05/24' },
        { id: 8, title: 'Cybernetic Conquest: Digital Warfare', price: 0, platform: 'PC, PlayStation 5, Xbox Series X', genre: 'Estrategia de Ciberpunk', pegi: 16, releaseDate: '11/05/24' },
        { id: 9, title: 'Shadowlands: Chronicles of Darkness', price: 39.99, platform: 'PC', genre: 'Aventura de Terror', pegi: 18, releaseDate: '10/05/24' },
        { id: 10, title: 'Fantasy Frontier: Kingdoms Rising', price: 54.99, platform: 'PlayStation 5', genre: 'Estrategia de Fantasía', pegi: 12, releaseDate: '09/05/24' },
        { id: 11, title: 'Chronicles of Destiny: Legacy Reborn', price: 49.99, platform: 'Xbox Series X', genre: 'Fantasy RPG', pegi: 16, releaseDate: '24/04/24' },
        { id: 12, title: 'Interstellar Odyssey: Galactic Explorer', price: 59.99, platform: 'PC', genre: 'Space Exploration', pegi: 12, releaseDate: '22/04/24' },
        { id: 13, title: 'Nuclear Winter: Frost Survival', price: 39.99, platform: 'PlayStation 5', genre: 'Survival Horror', pegi: 18, releaseDate: '20/04/24' },
        { id: 14, title: 'Arcane Legends: Sorcerer\'s Awakening', price: 54.99, platform: 'Nintendo Switch', genre: 'Action RPG', pegi: 10, releaseDate: '18/04/24' },
        { id: 15, title: 'Cyberpunk Revolution: Digital Uprising', price: 49.99, platform: 'PC', genre: 'Cyberpunk Action', pegi: 16, releaseDate: '16/04/24' },
        { id: 16, title: 'Shadow Tactics: Silent Assassins', price: 44.99, platform: 'PlayStation 5', genre: 'Stealth Strategy', pegi: 16, releaseDate: '14/04/24' },
        { id: 17, title: 'Medieval Conquest: Kingdoms Clash', price: 49.99, platform: 'Xbox Series X', genre: 'Strategy Simulation', pegi: 12, releaseDate: '12/04/24' },
        { id: 18, title: 'Lost Paradise: Island Survival', price: 0, platform: 'Nintendo Switch', genre: 'Adventure Survival', pegi: 12, releaseDate: '10/04/24' },
        { id: 19, title: 'Eternal Darkness: Cursed Legacy', price: 39.99, platform: 'PC', genre: 'Horror Adventure', pegi: 18, releaseDate: '08/04/24' },
        { id: 20, title: 'Wild West Legends: Outlaw Redemption', price: 54.99, platform: 'PlayStation 5', genre: 'Western Adventure', pegi: 16, releaseDate: '06/04/24' },
        { id: 21, title: 'Vampire Chronicles: Blood Moon Rising', price: 49.99, platform: 'Xbox Series X', genre: 'Action-Adventure', pegi: 18, releaseDate: '04/04/24' },
        { id: 22, title: 'Space Odyssey: Frontier Expedition', price: 59.99, platform: 'PC', genre: 'Space Simulation', pegi: 10, releaseDate: '02/04/24' },
        { id: 23, title: 'Fantasy Realms: Mage\'s Legacy', price: 39.99, platform: 'PlayStation 5', genre: 'Fantasy Adventure', pegi: 12, releaseDate: '31/03/24' },
        { id: 24, title: 'Alien Invasion: Xeno Threat', price: 54.99, platform: 'Xbox Series X', genre: 'Sci-Fi Shooter', pegi: 16, releaseDate: '29/03/24' },
        { id: 25, title: 'Mystic Quest: Enchanted Journey', price: 49.99, platform: 'Nintendo Switch', genre: 'Adventure Puzzle', pegi: 10, releaseDate: '27/03/24' },
        { id: 26, title: 'Samurai Legends: Bushido Honor', price: 44.99, platform: 'PC', genre: 'Action RPG', pegi: 16, releaseDate: '25/03/24' },
        { id: 27, title: 'Cybernetic Warzone: Digital Assault', price: 49.99, platform: 'PlayStation 5', genre: 'Cyberpunk Shooter', pegi: 18, releaseDate: '23/03/24' },
        { id: 28, title: 'Pirate\'s Curse: Blackbeard\'s Revenge', price: 0, platform: 'Xbox Series X', genre: 'Pirate Adventure', pegi: 12, releaseDate: '21/03/24' },
        { id: 29, title: 'Jurassic World: Dino Rampage', price: 39.99, platform: 'Nintendo Switch', genre: 'Action-Adventure', pegi: 10, releaseDate: '19/03/24' },
        { id: 30, title: 'Zombie Apocalypse: Undead Horde', price: 54.99, platform: 'PC', genre: 'Survival Horror', pegi: 18, releaseDate: '17/03/24' }
      ]
    };
  }

  readReviews(): Observable<any> {
    return this.http.get<any>('assets/jsons/reviews.json');
  }
  saveReviews(data: any): Observable<any> {
    return this.http.put('assets/jsons/reviews.json', data);
  }
}
