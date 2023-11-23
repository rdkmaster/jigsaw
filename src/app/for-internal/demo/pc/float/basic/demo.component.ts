import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class FloatBasicDemo {
    public jigsawFloatOpen;

    closeFloat() {
        this.jigsawFloatOpen = false
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-float指令最简单的用法，所有配置项都用默认';
    description: string = '';
}
