import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Chat application!';
    channels: FirebaseListObservable<any[]>;
    status: FirebaseObjectObservable<any>;
    userId: number;

    constructor(private af: AngularFire, private http: Http) {
        // this.channels = this.af.database.list('/channels/user1');
        // this.userId = Math.floor((Math.random() * 10) + 1);
    }

    login(userId: string) {
        this.http.get('https://restful-node-mongo.herokuapp.com/user/token/' + userId).subscribe(data => {
            data = data.json();
            let authToken = data['data']['token'];
            this.af.auth.login(authToken, {
                provider: AuthProviders.Custom,
                method: AuthMethods.CustomToken
            });
            this.channels = this.af.database.list('/channels/user' + userId);
        });
    }

    logout() {
        this.af.auth.logout();
    }

    getStatus(userId: string) {
        this.status = this.af.database.object('/user/' + userId);
        let statusString = '';
        this.status.subscribe(data => {
            statusString = data.status;
        });
        return statusString;
    }
}
