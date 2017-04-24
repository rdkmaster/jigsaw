/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit} from '@angular/core';
import {DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: './trigger.html',
})
export class RdkDropDownTrigger implements OnInit {

    private trigger = DropDownTrigger.click;

    changeTriger() {
        this.trigger = DropDownTrigger.hover;
    }

    constructor() { }

    ngOnInit() { }

}
