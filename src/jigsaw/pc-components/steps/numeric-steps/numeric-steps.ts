import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../../../common/common";
import {JigsawTrustedHtmlModule} from "../../../common/directive/trusted-html/trusted-html";

export type NumericStepItem = {
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
    disabled?: boolean
};

@Component({
    selector: "jigsaw-numeric-steps,j-numeric-steps",
    templateUrl: "numeric-steps.html",
    host: {
        "[class.jigsaw-numeric-steps-host]": "true",
        '[style.width]': 'width',
        '[style.height]': 'height',
        "[class.jigsaw-numeric-steps-vertical]": "direction === 'vertical'",
        "[class.jigsaw-numeric-steps-horizontal]": "direction === 'horizontal'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNumericSteps extends AbstractJigsawComponent {
    constructor(private _changeDetector: ChangeDetectorRef) {
        super();
    }

    /**
     * 步骤条的数据
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public data: NumericStepItem[] = [];

    private _current: number = 0;

    /**
     * 步骤条的当前步骤的索引值
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public get current(): number {
        return this._current;
    }

    public set current(value: number) {
        if (typeof value !== 'number' || value < 0 || value >= this.data?.length) {
            // 非法值默认都不选
            value = -1;
        }
        if (this._current !== value) {
            this._current = value;
            this._changeDetector.markForCheck();
            this.currentChange.emit(this._current);
        }
    }

    @Output()
    public currentChange = new EventEmitter<number>();

    /**
     * 设置步骤条的方向，支持水平方向和垂直方向
     *
     * @NoMarkForCheckRequired
     *
     * $demo = numeric-steps/basic
     */
    @Input()
    public direction: "vertical" | "horizontal" = "horizontal";

    /**
     * @internal
     */
    public _$changeCurrent(idx: number, item: NumericStepItem) {
        if (item?.disabled) {
            return;
        }
        this.current = idx;
    }
}

@NgModule({
    imports: [CommonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawNumericSteps],
    exports: [JigsawNumericSteps]
})
export class JigsawNumericStepsModule {
}
