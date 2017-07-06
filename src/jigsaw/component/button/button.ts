import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../core';

@Component({
    selector: 'jigsaw-button, a[jigsaw-button]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.jigsaw-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': '_calcLineHeight()',
        '[class.jigsaw-button-clicked]': "_clicked",
        '[class.jigsaw-button-size-small]': "presize === 'small'",
        '[class.jigsaw-button-size-large]': "presize === 'large'",
        '[class.jigsaw-button-color-primary]': "type === 'primary'",
        '[class.jigsaw-button-color-danger]': "type === 'danger'"
    }
})
export class JigsawButton extends AbstractJigsawComponent {

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
    declarations: [JigsawButton],
    exports: [JigsawButton]
})
export class JigsawButtonModule {

}
