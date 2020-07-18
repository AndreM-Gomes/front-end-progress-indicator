import { AngularFireAuthModule } from '@angular/fire/auth/';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

const firebaseConfig = {
  apiKey: 'AIzaSyD33C_XCCsHYSCoOVpnBMHXv4V6ALGhUNU',
  authDomain: 'progress-indicator-bd951.firebaseapp.com',
  databaseURL: 'https://progress-indicator-bd951.firebaseio.com',
  projectId: 'progress-indicator-bd951',
  storageBucket: 'progress-indicator-bd951.appspot.com',
  messagingSenderId: '1077960755514',
  appId: '1:1077960755514:web:925f7f4ce2fd21c3626803',
  measurementId: 'G-L1YR60CBBS'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
