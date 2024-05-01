import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { i18nModule } from './i18n.module';

import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { SkeletonComponent } from '../components/layout/skeleton/skeleton.component';
import { LoginComponent } from '../components/layout/header/login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    i18nModule
  ],
  exports: [
    SkeletonComponent
  ]
})
export class LayoutModule { }
