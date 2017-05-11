/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit} from '@angular/core';
import {DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: './trigger.html',
})
export class RdkDropDownTrigger implements OnInit {

    private openTrigger = DropDownTrigger.click;
    private stopTrigger = DropDownTrigger.click;

    changeTriger() {
        if (this.openTrigger === DropDownTrigger.click) {
            this.openTrigger = DropDownTrigger.mouseover;
        } else {
            this.openTrigger = DropDownTrigger.click;
        }
    }

    public clickProcess(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    constructor() {
    }

    ngOnInit() {
    }

}
