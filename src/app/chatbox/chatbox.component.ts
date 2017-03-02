import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {PushNotificationsService} from "angular2-notifications";

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit {
    @Input('userId') userId: string;
    channel: FirebaseObjectObservable<any[]>;
    private newMessage: string = '';
    private messageList: any[];
    private firebaseListObservable: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire, private _push: PushNotificationsService) {
        this.firebaseListObservable = this.af.database.list('/messages/channel1', {
            query: {
                orderByChild: 'timestamp',
            }
        });

        this.firebaseListObservable.subscribe(data => {
            this.messageList = data;
        });
    }

    ngOnInit() {
    }

    sendMessage(event: any) {
        if (event.keyCode == 13) {
            let mess = this.newMessage;
            if (mess != '') {
                this.firebaseListObservable.remove('user' + this.userId);
                this.firebaseListObservable.push({
                    "from": "user" + this.userId,
                    "message": mess,
                    "timestamp": Date.now()
                });
                this.newMessage = '';
            }
        } else {
            if (event.keyCode == 8) {
                if (this.newMessage == '') {
                    this.firebaseListObservable.remove('user' + this.userId);
                }
            } else {
                this.firebaseListObservable.update('user' + this.userId, {
                    "from": "user" + this.userId,
                    "isTyping": true,
                    "timestamp": Date.now()
                });
            }
        }
    }


}
