import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../components/home/home.component';
import { GamesComponent } from '../components/games/games.component';
import { NewsComponent } from '../components/news/news.component';
import { VideosComponent } from '../components/videos/videos.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { TheLatestComponent } from '../components/theLatest/theLatest.component';
import { GameDetailComponent } from '../components/games/game-detail/game-detail.component';
import { ErrorComponent } from '../components/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'the-latest', component: TheLatestComponent },  
  { path: 'game/:title', component: GameDetailComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
