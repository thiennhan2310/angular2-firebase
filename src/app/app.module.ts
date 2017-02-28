import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {ChatboxComponent} from './chatbox/chatbox.component';
import {PushNotificationsModule} from "angular2-notifications";
// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyC_nKaX1SYoz12dBiCr4VaNVjuQB0Qjhfc",
    authDomain: "lvtn-d1753.firebaseapp.com",
    databaseURL: "https://lvtn-d1753.firebaseio.com",
    storageBucket: "lvtn-d1753.appspot.com",
    messagingSenderId: "251746296237"
};

@NgModule({
    declarations: [
        AppComponent,
        ChatboxComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        PushNotificationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
