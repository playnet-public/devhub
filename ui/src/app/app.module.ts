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
} from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/router.module';

import { HeaderComponent } from './header/component';
import { LogoComponent } from './logo/logo.component';
import { HomeComponent } from './home/component';
import { FooterComponent } from './footer/component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

import * as Raven from 'raven-js';
import { UserService } from './backend/user.service';

Raven
.config('https://2bf8872573cf42fcb23c4ff15748ebfe@sentry.io/1201201')
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
    LogoComponent,
    HomeComponent,
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
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
  ]
})
export class AppModule {
}
