import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { i18nModule } from './i18n.module';

import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { SkeletonComponent } from '../components/layout/skeleton/skeleton.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
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
