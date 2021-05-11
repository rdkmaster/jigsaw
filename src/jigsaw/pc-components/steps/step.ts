import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "../../common/common";
import { CommonModule } from "@angular/common";
import { JigsawTrustedHtmlModule } from "../../common/directive/trusted-html/trusted-html";

export type StepItem = {
    /**
     * 单个步骤的状态
     */
    status: "normal" | "warning" | "error";
    /**
     * 单个步骤的标题
     */
    title: string;
    /**
     * 单个步骤的副标题
     */
    subTitle?: string;
    context?: any;
};

@Component({
    selector: "jigsaw-steps,j-steps",
    templateUrl: "step.html",
    host: {
        "[class.jigsaw-steps-host]": "true",
        '[style.width]': 'width',
        '[style.height]': 'height',
        "[class.jigsaw-steps-vertical]": "direction === 'vertical'",
        "[class.jigsaw-steps-horizontal]": "direction === 'horizontal'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSteps extends AbstractJigsawComponent {
    /**
     * 步骤条的数据
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public data: StepItem[] = [];

    /**
     * 步骤条的当前步骤的索引值
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public current: number = 0;

    /**
     * 设置步骤条的方向，支持水平方向和垂直方向
     *
     * @NoMarkForCheckRequired
     *
     * $demo = steps/vertical
     */
    @Input()
    public direction: "vertical" | "horizontal" = "horizontal";
}

@NgModule({
    imports: [CommonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawSteps],
    exports: [JigsawSteps]
})
export class JigsawStepsModule {}
