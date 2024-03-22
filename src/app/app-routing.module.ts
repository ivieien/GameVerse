import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './components/juegos/juegos/juegos.component';
import { NoticiasComponent } from './components/noticias/noticias/noticias.component';
import { VideosComponent } from './components/videos/videos/videos.component';
import { AnalisisComponent } from './components/analisis/analisis/analisis.component';
import { LoUltimoComponent } from './components/lo-ultimo/lo-ultimo/lo-ultimo.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'games', component: JuegosComponent },
  { path: 'news', component: NoticiasComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'reviews', component: AnalisisComponent },
  { path: 'the-latest', component: LoUltimoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }