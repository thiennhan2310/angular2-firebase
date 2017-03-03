import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {PushNotificationsService} from "angular2-notifications";

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit,OnChanges {
    @Input('userId') userId: string;
    @Input('channelId') channelId: string;
    channel: FirebaseObjectObservable<any[]>;
    private newMessage: string = '';
    private messageList: any[];
    private firebaseListObservable: FirebaseListObservable<any[]>;
    private firebaseObjectObservable: FirebaseObjectObservable<any[]>;
    private lastMessageKey: string;

    constructor(private af: AngularFire, private _push: PushNotificationsService) {

    }

    ngOnInit() {

    }

    ngOnChanges() {
        if (this.channelId != undefined) {

            this.firebaseListObservable = this.af.database.list('/messages/' + this.channelId, {
                query: {
                    orderByChild: 'timestamp',
                }
            });

            this.firebaseListObservable.subscribe(data => {
                this.messageList = data;
                this.lastMessageKey = data[data.length - 1]['$key'];
            });
        }
    }
    sendMessage(event: any) {
        if (event.keyCode == 13) {
            let mess = this.newMessage;
            if (mess != '') {
                this.firebaseListObservable.remove('user' + this.userId);
                this.firebaseListObservable.push({
                    "from": "user" + this.userId,
                    "message": mess,
                    "timestamp": Date.now(),
                    "status": 'unread'
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

    changeStatusMessageToRead() {
        this.firebaseObjectObservable = this.af.database.object('/messages/' + this.channelId + '/' + this.lastMessageKey);
        this.firebaseObjectObservable.subscribe(data => {
            if (data['from'] != 'user' + this.userId && data['status'] != 'read') {
                let readMessage = this.firebaseObjectObservable;
                setTimeout(function () {
                    readMessage.update({'status': 'read'});
                }, 2000);
            }
        });
    }
}
