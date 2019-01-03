import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
               .fa-bars{
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
export class FloatTriggerDemo {
    openTrigger = "mouseenter";
    closeTrigger = "mouseleave";
    public open: boolean = false;

    public openFloat() {
        this.open = true;
    }

    public closeFloat() {
        this.open = false;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变jigsawFloat指令的触发器';
    description: string = '';
    tags: string[] = [
        'JigsawFloat.jigsawFloatOpenTrigger',
        'JigsawFloat.jigsawFloatCloseTrigger',
    ];
}
