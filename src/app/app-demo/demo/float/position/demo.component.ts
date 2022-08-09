import {Component} from '@angular/core';
import {FloatTextService} from "../doc.service";

@Component({
    selector: 'float-position',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont-e9d8 {
            margin: 60px 160px;
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
export class FloatPositionDemoComponent {
    floatPosition1 = "bottomLeft";
    floatPosition2 = "bottomRight";
    floatPosition3 = "topLeft";
    floatPosition4 = "topRight";
    floatPosition5 = "leftTop";
    floatPosition6 = "leftBottom";
    floatPosition7 = "rightTop";
    floatPosition8 = "rightBottom";
    constructor( public text: FloatTextService) {
    }
}
