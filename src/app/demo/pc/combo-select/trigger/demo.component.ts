import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .drop-down {
            font-size: 16px;
            background-color: #ddd;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
    `]
})
export class ComboSelectTriggerDemo {
    openTrigger = "mouseenter";
    closeTrigger = "mouseleave";
    public open: boolean = true;

    public openCombo() {
        this.open = true;
    }
    public closeCombo() {
        this.open = false;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变下拉视图的触发器';
    description: string = '';
}
