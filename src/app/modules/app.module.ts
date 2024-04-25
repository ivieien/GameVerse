import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { i18nModule } from './i18n.module';
import { ViewsModule } from './views.module';

import { AppComponent } from '../app.component';
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        ViewsModule,
        NgbModule,
        i18nModule
        ],
})
export class AppModule { }