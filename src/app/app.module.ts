import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule
    ]
})
export class AppModule { }
