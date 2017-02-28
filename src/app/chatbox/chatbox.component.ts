import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {PushNotificationsService} from "angular2-notifications";

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnChanges {
    @Input('userId') userId: string;
    private newMessage: string = '';
    private messageList: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire, private _push: PushNotificationsService) {
        this.messageList = this.af.database.list('/messages/channel1', {
            query: {
                orderByChild: 'timestamp',
            }
        });
    }

    ngOnInit() {
    }

    sendMessage(event: any) {
        if (event.keyCode == 13) {
            let mess = this.newMessage;
            this.messageList.push({"from": "user" + this.userId, "message": mess, "timestamp": Date.now()});
            this.newMessage = '';
        }
    }

    ngOnChanges() {
        this._push.create('Test', {body: 'something'}).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
    }
}
