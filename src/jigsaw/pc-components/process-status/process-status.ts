import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common"

/**
 * 用于在界面上显示一个流程状态，并且可以实时更新各个状态，需要配合`JigsawProcessStatusItem`组件一起使用。
 *
 * @internal
 *
 * $demo = process-status/basic
 * $demo = process-status/status-interactive
 * $demo = process-status/vertical
 */
@WingsTheme('jigsaw-process-status')
@Component({
    selector: 'jigsaw-process-status, j-process-status',
    template: `
        <div class="jigsaw-process-status-container" [perfectScrollbar]="{wheelSpeed: 0.5, wheelPropagation: true}">
            <div class="jigsaw-step-left-space"></div>
            <ng-content></ng-content>
        </div>
    `,
    host: {
        '[class.jigsaw-process-status]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-process-status-size-small]': "preSize === 'small'",
        '[class.jigsaw-process-status-size-large]': "preSize === 'large'",
        '[class.jigsaw-process-status-direction-vertical]': "direction === 'vertical'",
        '[class.jigsaw-process-status-direction-horizontal]': "direction === 'horizontal'",
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawProcessStatus extends AbstractJigsawComponent {
    /**
     * 设置步骤条图标的预设尺寸
     *
     * @NoMarkForCheckRequired
     *
     * $demo = process-status/basic
     */
    @Input()
    public preSize: 'small' | 'default' | 'large' = "default";

    /**
     * 设置步骤条的方向，支持水平方向和垂直方向
     *
     * @NoMarkForCheckRequired
     *
     * $demo = process-status/vertical
     */
    @Input()
    public direction: 'vertical' | 'horizontal' = "horizontal";
}
