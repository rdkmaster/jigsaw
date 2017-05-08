/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit} from '@angular/core';
import {DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: './disable.html',
})
export class RdkDropDownDisable implements OnInit {

    private disabled = false;
    changeDisabled() {
        this.disabled = true;
    }
    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
    constructor() { }

    ngOnInit() { }

}
