import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
home: string = 'Inicio';
consoles: string = 'Consolas';
top100: string = 'Top100';
contact: string = 'Contacto';
facebook: string = 'Facebook';
twitter: string = 'Twitter';
instagram: string = 'Instagram';
youtube: string = 'YouTube';
}
