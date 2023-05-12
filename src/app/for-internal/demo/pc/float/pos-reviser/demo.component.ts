import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {JigsawThemeService, PopupOptions, PopupPositionValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class FloatPosReviserDemo implements AfterViewInit {
    @ViewChild('mover')
    public mover: ElementRef;
    public position;

    constructor(private _renderer: Renderer2, private _themeService: JigsawThemeService) {
        this.position = "bottomLeft";
    }

    options: PopupOptions = {
        posReviser: (pos: PopupPositionValue, popupElement: HTMLElement) => {
            // pos.left < 0表示：自动调整区域后左侧还是被盖住一部分
            if (pos.left < 0) {
                pos.left = 10;
            }
            return pos;
        },
        useCustomizedBackground: true
    };

    ngAfterViewInit(): void {
        const bg = this._themeService.majorStyle == 'light' ? '#eee' : '#333';
        this._renderer.setStyle(this.mover.nativeElement, 'background-color', bg);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-float指令自定义位置修正函数的用法.';
    description: string = '当弹出方向空间不够jigsaw-float会自动修正弹出的位置确保能完整显示弹出的内容，但觉得自动修正结果无法达到预期时可以自定义位置修正函数';
}
