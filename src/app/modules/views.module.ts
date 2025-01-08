import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { i18nModule } from './i18n.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { HomeComponent } from '../components/home/home.component';
import { GamesComponent } from '../components/games/games.component';
import { NewsComponent } from '../components/news/news.component';
import { NewsDetailComponent } from '../components/news/news-detail/news-detail.component';
import { VideosComponent } from '../components/videos/videos.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { TablesComponent } from '../components/tables/tables.component';
import { GameDetailComponent } from '../components/games/game-detail/game-detail.component';
import { SafeResourceUrlPipe } from '../pipes/safeResourceUrl.pipe';
import { TruncateTextPipe } from '../pipes/truncateText.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    GamesComponent,
    NewsComponent,
    NewsDetailComponent,
    VideosComponent,
    ReviewsComponent,
    TablesComponent,
    GameDetailComponent, 
    SafeResourceUrlPipe,
    TruncateTextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    i18nModule,
    NgxPaginationModule
  ],
  exports: [
    SafeResourceUrlPipe,
    TruncateTextPipe
  ]
})
export class ViewsModule { }
