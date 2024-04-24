import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { i18nModule } from './i18n.module';

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
        NgbModule,
        i18nModule
        ],
})
export class AppModule { }