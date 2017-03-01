import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {PushNotificationsService} from "angular2-notifications";

@Component({
    selector: 'app-messagelist',
    templateUrl: './messagelist.component.html',
    styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit, OnChanges {
    @Input('messageList') messageList: any[];
    // @Input('messageListLength') messageListLength : number; //to detect change
    constructor(private _push: PushNotificationsService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.pushNoti();
    }

    pushNoti() {
        if (this.messageList != undefined) {
            let lastMesage = this.messageList[this.messageList.length - 1]['message'] || '';
            this._push.create('Primus chat APP', {
                icon: 'https://docs.nativescript.org/img/cli-getting-started/angular/chapter0/Angular_logo.png',
                body: lastMesage,
            }).subscribe(
                res => console.log(res),
                err => console.log(err)
            )
        }

    }
}
