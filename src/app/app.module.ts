import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
import { UsuarioProvider } from '../providers/usuario/usuario';

export const firebaseConfig = {
  apiKey: "AIzaSyD8K7lk63hBqnD_ZGhg_Fx9FqGFAg8zsKo",
  authDomain: "carasoft-418d6.firebaseapp.com",
  databaseURL: "https://carasoft-418d6.firebaseio.com",
  projectId: "carasoft-418d6",
  storageBucket: "carasoft-418d6.appspot.com",
  messagingSenderId: "218374975257"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [ 
    MyApp,
    HomePage,
    LoginPage,
    InicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
