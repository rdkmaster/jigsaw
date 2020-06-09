import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../../common/common';

/**
 * 在界面上显示一个按钮，最常见最简单的组件。
 * - 支持多种预设颜色用于表达按钮不同的作用，参考`colorType`；
 * - 支持多种预设尺寸以适应不同场合，参考`preSize`；
 * - 支持任意自定义尺寸，[参考这里]($demo=button/width-height)；
 * - 支持彻底的自定义标签，甚至与loading融合在一起使用，[参考这里]($demo=button/with-loading)；
 *
 * 这是一个表单友好组件。与表单配合使用时，建议用法
 * `<button jigsaw-button type="submit"></button>`，
 * 参考[这个demo]($demo=form/template-driven)。
 *
 * $demo = button/full
 * $demo = button/basic
 */
@Component({
    selector: 'jigsaw-button, a[jigsaw-button], button[jigsaw-button], j-button, a[j-button], button[j-button]',
    templateUrl: 'button.html',
    host: {
        '[class.jigsaw-button]': 'true',
        '[class.jigsaw-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.min-width]': 'width',
        '[style.height]': 'height',
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
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = button/disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * 按钮颜色类型 `default` , `primary` , `warning` , `error|danger`
     *
     * $demo = button/full
     */
    @Input() public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' = 'default';

    /**
     * 按钮预设尺寸 `default` , `small` , `large`
     *
     * $demo = button/full
     */
    @Input() public preSize: 'default' | 'small' | 'large' = 'default';

    // 按钮动画执行状态
    private _clicked: boolean = false;

    private _onClick(): void {
        if (!this.disabled && !this._clicked) {
            this._clicked = true;
            this.callLater(() => this._clicked = false, 360);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawButton],
    exports: [JigsawButton]
})
export class JigsawButtonModule {

}
