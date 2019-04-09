import {Component} from "@angular/core";
import {PopupOptions, PopupPositionValue} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .fa-bars {
            margin: 40px
        }

        .jigsawFloatArea {
            width: 190px;
            height: 60px;
            background: orange;
            color: #fff;
            text-align: center;
        }

        p {
            margin: 10px;
        }
    `]
})
export class FloatPosReviserDemo {
    options: PopupOptions = {
        posReviser: (pos: PopupPositionValue, popupElement: HTMLElement) => {
            // pos.left < 0表示：自动调整区域后左侧还是被盖住一部分
            if (pos.left < 0) {
                pos.left = 10;
            }
            return pos;
        }
    };

    public position;

    constructor() {
        this.position = "bottomLeft";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-float指令自定义位置修正函数的用法.';
    description: string = '当弹出方向空间不够jigsaw-float会自动修正弹出的位置确保能完整显示弹出的内容，但觉得自动修正结果无法达到预期时可以自定义位置修正函数';
}
