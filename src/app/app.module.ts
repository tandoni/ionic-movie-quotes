import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QuoteDetailPageModule } from "../pages/quote-detail/quote-detail.module";
import { ListPageModule } from "../pages/list/list.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDkpybXFU_u4yTrOo-_Xrn82xuRehUy5b4",
  authDomain: "tandoni-movie-quotes-7987a.firebaseapp.com",
  databaseURL: "https://tandoni-movie-quotes-7987a.firebaseio.com",
  projectId: "tandoni-movie-quotes-7987a",
  storageBucket: "tandoni-movie-quotes-7987a.appspot.com",
  messagingSenderId: "496260206754"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QuoteDetailPageModule,
    ListPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
