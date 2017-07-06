/**
 * Created by 10177553 on 2017/3/29.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'basic.html',
    styleUrls:['basic.scss']
})
export class JigsawTabsDemoComponent implements OnInit {

    testEvent(value) {
        console.info(value);
    }

    constructor() { }

    ngOnInit() { }

}
