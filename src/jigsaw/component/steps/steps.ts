import {AbstractJigsawComponent} from "../common"
import {Component, Input} from "@angular/core";

/**
 * 用于在界面上显示一个步骤条，并且可以实时更新各个步骤的状态，需要配合`JigsawStepItem`组件一起使用。
 *
 * $demo = steps/basic
 * $demo = steps/step-interactive
 * $demo = steps/vertical
 *
 * $since = v1.1.6
 */
@Component({
    selector: 'jigsaw-steps, j-steps',
    template: '<div class="steps-container"><div class="step-left-space"></div><ng-content></ng-content></div>',
    host: {
        '[class.jigsaw-steps]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-steps-size-small]': "preSize === 'small'",
        '[class.jigsaw-steps-size-large]': "preSize === 'large'",
        '[class.jigsaw-steps-direction-vertical]': "direction === 'vertical'",
        '[class.jigsaw-steps-direction-horizontal]': "direction === 'horizontal'",
    }
})
export class JigsawSteps extends AbstractJigsawComponent {
    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */
    @Input() public preSize: 'small' | 'default' | 'large' = "default";

    /**
     * 设置步骤条的方向，支持水平方向和垂直方向
     *
     * $demo = steps/vertical
     */
    @Input() public direction: 'vertical' | 'horizontal' = "horizontal";
}
