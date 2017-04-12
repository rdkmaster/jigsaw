/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown, DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    template: `
        <div class="contaner">
            <input type="button" (click)="changeTriger()" value="hover触发">
            <input type="button" (click)="changeDisabled()" value="变为不可编辑">
            <input type="button" (click)="changeWidth()" value="改变dropdown的宽度">
        </div>
        
        <rdk-drop-down placeholder="请输入姓名~" [value]=name.value  [mode]=mode #dropDown [trigger]="trigger" [disabled]="disabled"
        [dropDownWidth]="width">
            <label for="">姓名: </label>
            <input type="text" placeholder="请输入姓名~" #name value="Lily"/>
            <br />
            <input type="button" value="提交" (click)="formSubmit($event)">
        </rdk-drop-down>
    `,
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
