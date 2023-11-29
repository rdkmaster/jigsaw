import {ChangeDetectionStrategy, Component, ElementRef, Input, NgModule, NgZone, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent, WingsTheme} from '../../common/common';

/**
 * 在界面上显示一个按钮，最常见最简单的组件。
 * - 支持多种预设颜色用于表达按钮不同的作用，参考`colorType`；
 * - 支持多种预设尺寸以适应不同场合，参考`preSize`；
 * - 支持任意自定义尺寸，[参考这里](/#/components/button?demo=button-login)；
 * - 支持彻底的自定义标签，甚至与loading融合在一起使用，[参考这里](/#/components/button?demo=button-loading)；
 *
 * 这是一个表单友好组件。与表单配合使用时，建议用法
 * `<button jigsaw-button type="submit"></button>`，
 */
@WingsTheme('button.scss')
@Component({
    selector: 'jigsaw-button, a[jigsaw-button], button[jigsaw-button], j-button, a[j-button], button[j-button]',
    templateUrl: 'button.html',
    host: {
        '[style.min-width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-button-host]': 'true',
        '[class.jigsaw-button-disabled]': 'disabled',
        '[class.jigsaw-button-clicked]': "_$clicked",
        '[class.jigsaw-button-size-small]': "preSize === 'small'",
        '[class.jigsaw-button-size-medium]': "preSize === 'medium'",
        '[class.jigsaw-button-size-large]': "preSize === 'large'",
        '[class.jigsaw-button-color-primary]': "colorType === 'primary'",
        '[class.jigsaw-button-color-warning]': "colorType === 'warning'",
        '[class.jigsaw-button-color-error]': "colorType === 'error' || colorType === 'danger'",
        '[class.jigsaw-button-color-none]': "colorType === 'none'",
        '[class.jigsaw-button-icon-left]': "iconPosition === 'left'",
        '[class.jigsaw-button-icon-right]': "iconPosition === 'right'",
        '(click)': '_onClick()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawButton extends AbstractJigsawComponent implements AfterViewInit{
    constructor(public element: ElementRef, protected _zone: NgZone, protected _renderer: Renderer2) {
        super(_zone);
    }

    @ViewChild('text')
    text: ElementRef;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/disabled
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 按钮颜色类型 `default` , `primary` , `warning` , `error|danger`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' | 'none' = 'default';

    /**
     * 按钮预设尺寸 `default` , `small` , `large`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public preSize: 'default' | 'small' | 'medium' | 'large' = 'default';

    /**
     * 配置按钮图标
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public icon: string;

    /**
     * 图标的位置
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public iconPosition: 'left' | 'right' = 'left';

    /**
     * 按钮动画执行状态
     * @internal
     */
    public _$clicked: boolean = false;

    /**
     * @internal
     */
    public _onClick(): void {
        if (!this.disabled && !this._$clicked) {
            this._$clicked = true;
            this.callLater(() => this._$clicked = false, 360);
        }
    }

    ngAfterViewInit() {
        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                if (this.text.nativeElement.innerText) {
                    return
                }
                // 需要将判定时间点进一步延后，以防止在某些情况（j-box + ngIf）下，获取不到innerText的情况
                setTimeout(() => {
                    if (!this.text.nativeElement.innerText) {
                        this._renderer.addClass(this.element.nativeElement, 'jigsaw-button-icon');
                    }
                })
            });
        });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawButton],
    exports: [JigsawButton]
})
export class JigsawButtonModule {

}
