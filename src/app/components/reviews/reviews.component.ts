import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent {
  sectionTitle: string = 'Reseñas'
  formTitle: string = 'Añadir Reseña'
  labelTitle: string = 'Título'
  labelContent: string = 'Contenido'
  submitBtn: string = 'Enviar Reseña'

  reviews: { title: string, content: string, author: string, date: string }[] = [
    {
      title: 'Reseña de Mario Kart 8 Deluxe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Usuario1',
      date: '19 de abril de 2024'
    },
    {
      title: 'Análisis de The Legend of Zelda: Breath of the Wild',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Usuario2',
      date: '20 de abril de 2024'
    },
  ];
}