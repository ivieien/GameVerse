import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/layout/header/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer/footer.component';
import { SkeletonComponent } from '../components/layout/skeleton/skeleton/skeleton.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SkeletonComponent
  ]
})
export class LayoutModule { }
