import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {UserComponent} from "./user-component/user-component";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .fa-bars {
            margin: 100px
        }

        .jigsawFloatArea1 {
            width: 150px;
            height: 60px;
            background: orange;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }

        .jigsawFloatArea2 {
            width: 150px;
            height: 60px;
            background: green;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
    `]
})
export class FloatTargetDemo implements AfterViewInit {
    @ViewChild('jigsawFloatArea1')
    jigsawFloatArea1: TemplateRef<any>;
    @ViewChild('jigsawFloatArea2')
    jigsawFloatArea2: TemplateRef<any>;

    public target: any = UserComponent;
    public targets: any[] = [
        {label: "template1"}, {label: "template2"},
        {label: "component", target: this.target}
    ];

    ngAfterViewInit() {
        this.targets[0].target = this.jigsawFloatArea1;
        this.targets[1].target = this.jigsawFloatArea2;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变jigsawFloat指令的弹出目标';
    description: string = '';
}
