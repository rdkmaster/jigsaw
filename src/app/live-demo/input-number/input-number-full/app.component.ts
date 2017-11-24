import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class InputNumberFullComponent implements OnInit {
    Value = 7;

    constructor() {
        // this._displayValue = 7;
    }

    ngOnInit() {
    }
}
