import {Component, OnInit} from '@angular/core';
import {JigsawNotification} from "../../../jigsaw/component/notification/notification.component";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class NotificationFullComponent implements OnInit {
    answer = '';

    constructor() {
    }

    ngOnInit() {

    }

    commonNotification() {
        this.answer = 'waiting for an answer';
        JigsawNotification.show('this is a great info alert!');
    }
}
