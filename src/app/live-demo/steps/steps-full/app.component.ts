import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class StepsFullComponent implements OnInit {
    nzCurrent:any;

    constructor() {
        this.nzCurrent = 2;
    }

    ngOnInit() {
    }
}
