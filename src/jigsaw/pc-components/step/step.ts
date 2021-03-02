import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { CommonModule } from "@angular/common";
import { JigsawTrustedHtmlModule } from "jigsaw/common/directive/trusted-html/trusted-html";

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
    selector: "jigsaw-step,j-step",
    templateUrl: "step.html",
    host: {
        "[class.jigsaw-step-host]": "true",
        "[class.jigsaw-step-vertical]": "direction === 'vertical'",
        "[class.jigsaw-step-horizontal]": "direction === 'horizontal'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawStep extends AbstractJigsawComponent {
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
    declarations: [JigsawStep],
    exports: [JigsawStep]
})
export class JigsawStepModule {}
