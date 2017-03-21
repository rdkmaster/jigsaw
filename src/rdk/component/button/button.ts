import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'rdk-button, a[rdk-button]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.rdk-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width.px]': 'width',
        '[style.height.px]': 'height',
        '[class.rdk-button-clicked]': "_clicked"
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
    private _clicked: boolean = false;

    private _onClick(): void {
        if (!this.disabled) {
            this._clicked = true;
            setTimeout(() => this._clicked = false, 360);
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
