import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../common';

@Component({
    selector: 'jigsaw-button, a[jigsaw-button], button[jigsaw-button], j-button, a[j-button], button[j-button]',
    templateUrl: 'button.html',
    host: {
        '[class.jigsaw-button]': 'true',
        '[class.jigsaw-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': '_calcLineHeight()',
        '[class.jigsaw-button-clicked]': "_clicked",
        '[class.jigsaw-button-size-small]': "preSize === 'small'",
        '[class.jigsaw-button-size-large]': "preSize === 'large'",
        '[class.jigsaw-button-color-primary]': "colorType === 'primary'",
        '[class.jigsaw-button-color-warning]': "colorType === 'warning'",
        '[class.jigsaw-button-color-error]': "colorType === 'error' || colorType === 'danger'"
    }
})
export class JigsawButton extends AbstractJigsawComponent {

    /**
     * 按钮不可点击状态
     */
    @Input() public disabled: boolean = false;

    /**
     * 按钮颜色类型 `default` , `primary` , `warning` , `error|danger`
     */
    @Input() public colorType: string = 'default';

    /**
     * 按钮预设尺寸 `default` , `small` , `large`
     */
    @Input() public preSize = 'default';

    //按钮动画执行状态
    private _clicked: boolean = false;

    private _onClick(): void {
        if (!this.disabled && !this._clicked) {
            this._clicked = true;
            this.callLater(() => this._clicked = false, 360);
        }
    }

    private _calcLineHeight(): string {
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
