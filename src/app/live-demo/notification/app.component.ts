import {Component, OnInit} from '@angular/core';
import {JigsawNotification, NotificationPosition} from "jigsaw/component/notification/notification.component";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class NotificationFullComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }

    commonNotification() {
        JigsawNotification.show('this is a great info alert!','rrrrrrrrrrrrrrrrrrrrr','question', NotificationPosition.rightTop, 0);
    }
}
