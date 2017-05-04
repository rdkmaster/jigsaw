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
        if(this.trigger == DropDownTrigger.hover){
            this.trigger = DropDownTrigger.click
        }else{
            this.trigger=DropDownTrigger.hover
        }
    }

    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }

    constructor() { }

    ngOnInit() { }

}
