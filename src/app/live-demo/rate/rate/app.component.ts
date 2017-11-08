import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class RateFullComponent implements OnInit {
    selectedValue = 3;
    selectedHalfValue = 2.5;

    constructor() {
    }

    ngOnInit() {
    }

    selectChange(value:any){
        console.log(value);
    }
}
