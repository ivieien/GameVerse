import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './components/juegos/juegos/juegos.component';
import { NoticiasComponent } from './components/noticias/noticias/noticias.component';
import { VideosComponent } from './components/videos/videos/videos.component';
import { AnalisisComponent } from './components/analisis/analisis/analisis.component';
import { LoginComponent } from './components/login/login/login.component';
import { LoUltimoComponent } from './components/lo-ultimo/lo-ultimo/lo-ultimo.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'lo ultimo', component: LoUltimoComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
