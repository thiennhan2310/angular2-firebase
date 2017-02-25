import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Chat application!';
    channels: FirebaseListObservable<any[]>;
    status: FirebaseObjectObservable<any>;

    constructor(private af: AngularFire) {
        this.channels = this.af.database.list('/channels/user1');
    }

    login() {
        let authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1uZ215bEBsdnRuLWQxNzUzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstbmdteWxAbHZ0bi1kMTc1My5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNDg4MDM5MzI1LCJleHAiOjE0ODgwNDI5MjUsInVpZCI6MTExfQ.AwdZRsWJFNdlvkkREaNSVUETELCzxp38y7cXqBCRqhraAvGcTOCm71dEjl_LWOYSZ8jafH2kWNXX7LS7nM0MhFX6U8QdyWMNqOW5KDbFjRlHb15T5uSS3GA_ZoSrXfNDe3hGnYnRLvmY9XF6rHKRRSivTqH9dnMGOYYWZEDaOcjvYxvT4skz3JW9C1S4Qkxwc4KCfGfM7Pb8Xe2hf0xVzmWDd-yhPIUtW4CIRQk8QYy4TKZnkThoIvCDWRnKXOBKa9hSryjd1BE5R4tJb4ATirkXV1lkzVGqDQwTEVRlB0YOqLENHTOh2UggVutnY-uMdQ9bpa7v4qo2TbmOcBwkNw';
        this.af.auth.login(authToken, {
            provider: AuthProviders.Custom,
            method: AuthMethods.CustomToken
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
