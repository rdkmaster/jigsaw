import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractRDKComponent} from '../core';

@Component({
    selector: 'rdk-button, a[rdk-button]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.rdk-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': '_calcLineHeight()',
        '[class.rdk-button-clicked]': "_clicked",
        '[class.rdk-button-size-small]': "presize === 'small'",
        '[class.rdk-button-size-large]': "presize === 'large'",
        '[class.rdk-button-color-primary]': "type === 'primary'",
        '[class.rdk-button-color-danger]': "type === 'danger'"
    }
})
export class RdkButton extends AbstractRDKComponent {

    //按钮不可点击状态
    @Input() public disabled: boolean = false;

    //按钮颜色类型, '', primary, danger
    @Input() public type: string = '';

    //按钮预设尺寸， small, '', large
    @Input() public presize = '';

    //按钮动画执行状态
    private _clicked: boolean = false;

    private _onClick(): void {
        if (!this.disabled && !this._clicked) {
            this._clicked = true;
            setTimeout(() => this._clicked = false, 360);
        }
    }

    private _calcLineHeight():string {
        return parseInt(this.height) - 4 + 'px';
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkButton],
    exports: [RdkButton]
})
export class RdkButtonModule {

}
