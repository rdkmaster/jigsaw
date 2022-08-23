import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { User1Component } from "./user-component/user-component";
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-target',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont-e9d8 {
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
export class FloatTargetDemoComponent implements AfterViewInit {
    @ViewChild('jigsawFloatArea1')
    jigsawFloatArea1: TemplateRef<any>;
    @ViewChild('jigsawFloatArea2')
    jigsawFloatArea2: TemplateRef<any>;

    public target: any = User1Component;
    public targets: any[] = [
        { label: "template1" }, { label: "template2" },
        { label: "component", target: this.target }
    ];

    ngAfterViewInit() {
        this.targets[0].target = this.jigsawFloatArea1;
        this.targets[1].target = this.jigsawFloatArea2;
    }
    constructor(public doc: FloatTextService) {
    }
}
