import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/layout/header/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer/footer.component';
import { SkeletonComponent } from '../components/layout/skeleton/skeleton/skeleton.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkeletonComponent
  ]
})
export class LayoutModule { }
