import {NgModule, Component, Input, OnChanges, SimpleChanges, Renderer, ElementRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'rdk-btn, a[rdk-btn]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width.px]': 'width',
        '[style.height.px]': 'height',
        '[class.am-running]': "_amRunning"
    }
})
export class ButtonComponent{
    //按钮文本
    @Input() label: string;

    //按钮宽度
    @Input() width: number;

    //按钮高度
    @Input() height: number;

    //按钮不可点击状态
    @Input() disabled: boolean = false;

    //按钮动画执行状态
    private _amRunning: boolean = false;

    private _onClick(): void {
        if (!this.disabled) {
            this._amRunning = true;
            setTimeout(() => this._amRunning = false, 360);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent]
})
export class ButtonModule {

}
