import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { LayoutModule } from './layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../services/translation.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [TranslationService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        NgbModule,
        HttpClientModule,
        ],
})
export class AppModule { }