/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown, DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: './basic.html',
    styles: [`
        .contaner {
            padding: 5px;
        }
        
    `]
})
export class RdkDropDownInput implements OnInit {
    name: string = "Lily";

    @ViewChild('dropDown') dropDown:RdkDropDown;

    mode = DropDownMode.multiple;

    formSubmit() {
        this.dropDown.close();
    }

    private trigger = DropDownTrigger.click;
    changeTriger() {
        this.trigger = DropDownTrigger.hover;
    }

    disabled = false;
    changeDisabled() {
        this.disabled = true;
    }

    width
    changeWidth() {
        this.width = "120%";
    }

    constructor() { }

    ngOnInit() { }

}
