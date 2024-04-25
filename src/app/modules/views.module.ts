import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { i18nModule } from './i18n.module';

import { HomeComponent } from '../components/home/home.component';
import { GamesComponent } from '../components/games/games.component';
import { NewsComponent } from '../components/news/news.component';
import { VideosComponent } from '../components/videos/videos.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { TheLatestComponent } from '../components/theLatest/theLatest.component';
import { GameDetailComponent } from '../components/games/game-detail/game-detail.component';
import { SafeResourceUrlPipe } from '../pipes/safeResourceUrl.pipe';
import { TranslateJsonsPipe } from '../pipes/translateJsons.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    GamesComponent,
    NewsComponent,
    VideosComponent,
    ReviewsComponent,
    TheLatestComponent,
    GameDetailComponent,
    SafeResourceUrlPipe,
    TranslateJsonsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    i18nModule
  ],
  exports: [
    SafeResourceUrlPipe,
    TranslateJsonsPipe
  ]
})
export class ViewsModule { }
