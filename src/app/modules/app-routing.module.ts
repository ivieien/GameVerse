import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../components/home/home.component';
import { GamesComponent } from '../components/games/games.component';
import { NewsComponent } from '../components/news/news.component';
import { VideosComponent } from '../components/videos/videos.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { TablesComponent } from '../components/tables/tables.component';
import { NewsDetailComponent } from '../components/news/news-detail/news-detail.component';
import { GameDetailComponent } from '../components/games/game-detail/game-detail.component';
import { ErrorComponent } from '../components/error/error.component';
import { ErrorAdminComponent } from '../components/error/error-admin/error-admin.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'games', component: GamesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'videos', component: VideosComponent},
  { path: 'reviews', component: ReviewsComponent },
  { path: 'tables', component: TablesComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'} },
  { path: 'news/:title', component: NewsDetailComponent},
  { path: 'games/:title', component: GameDetailComponent }, 
  { path: 'error-admin', component:ErrorAdminComponent }, 
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
