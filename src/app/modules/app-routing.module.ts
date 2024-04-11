import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../components/home/home.component';
import { GamesComponent } from '../components/games/games.component';
import { NewsComponent } from '../components/news/news.component';
import { VideosComponent } from '../components/videos/videos.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { TheLatestComponent } from '../components/theLatest/theLatest.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'news', component: ReviewsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'the-latest', component: TheLatestComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    GamesComponent,
    NewsComponent,
    VideosComponent,
    ReviewsComponent,
    TheLatestComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
