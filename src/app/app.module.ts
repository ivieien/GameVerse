import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { LayoutModule } from './modules/layout.module';
import { ViewsModule } from './modules/views.module';
import { i18nModule } from './modules/i18n.module';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [DatePipe],
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