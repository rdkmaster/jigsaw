import {AfterViewInit, Component} from '@angular/core';
import {UserComponent} from "./user-component/user-component";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .fa-bars {
            margin: 100px
        }
    `]
})
export class FloatInitDataDemo {
    public target: any = UserComponent;
    public initData: any = {
        inputData: 'some data...'
    };

    ngAfterViewInit() {
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变jigsawFloat指令的弹出目标';
    description: string = '';
}
