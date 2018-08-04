import { NgModule, ErrorHandler } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatChipsModule,
} from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/router.module';

import { HeaderComponent } from './header/component';
import { HomeComponent } from './home/component';
import { FooterComponent } from './footer/component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

import * as Raven from 'raven-js';
import { UserService } from './backend/user.service';
import { PagesComponent } from './pages/component';
import { PageService } from './backend/page.service';
import { TagService } from './backend/tag.service';
import { TagsComponent } from './tags/component';

Raven
.config('')
.install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    if (!environment.isDev) {
      Raven.captureException(err);
    }
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/messages.', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PagesComponent,
    TagsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    UserService,
    PageService,
    TagService,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
  ]
})
export class AppModule {
}
