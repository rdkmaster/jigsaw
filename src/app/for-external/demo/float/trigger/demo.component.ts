import {Component} from '@angular/core';
import {FloatTextService} from "../doc.service";

@Component({
    selector: 'float-trigger',
    templateUrl: './demo.component.html',
    styles: [`
               .iconfont-e9d8{
                     margin:100px
               }
               .jigsawFloatArea{
                   width:150px;
                   height:60px;
                   background:orange;
                   color:#fff;
                   text-align:center;
                   line-height:60px;
               }
    `]
})
export class FloatTriggerDemoComponent {
    closeTrigger = "mouseleave";
    public openTrigger: string = "mouseenter";
    openTrigger1 = "click";
    closeTrigger1 = "click";
    openTrigger2 = "none";
    closeTrigger2 = "none";

    public open: boolean = false;
    public open1: boolean = false;
    public open2: boolean = false;

    public openFloat() {
        this.open2 = true;
    }
    public closeFloat() {
        this.open2 = false;
    }


    constructor( public text: FloatTextService) {
    }
}
