import { Component } from "@angular/core";
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-basic',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont-e9d8 {
            margin: 20px 100px;
        }

        .jigsawFloatArea {
            width: 150px;
            height: 60px;
            background: orange;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
    `]
})
export class FloatBasicDemoComponent {
    constructor(public doc: FloatTextService) {
    }
}
