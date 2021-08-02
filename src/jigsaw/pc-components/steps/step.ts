import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonModule} from "@angular/common";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";

export type StepItem = {
    /**
     * 单个步骤的状态
     */
    status?: "normal" | "warning" | "error";
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
    public data: StepItem[] = [];

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
        if (isNaN(value) || typeof value !== 'number' || value < 0 || value >= this.data?.length) {
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

    @Output()
    public remove = new EventEmitter<number>();

    @Output()
    public add = new EventEmitter<JigsawSteps>();

    /**
     * 设置步骤条的方向，支持水平方向和垂直方向
     *
     * @NoMarkForCheckRequired
     *
     * $demo = steps/basic
     */
    @Input()
    public direction: "vertical" | "horizontal" = "horizontal";

    /**
     * @internal
     */
    public _$changeCurrent(idx: number, item: StepItem) {
        if (item?.disabled) {
            return;
        }
        this.current = idx;
    }

    /**
     * 添加一个节点
     * @param step：要添加的节点数据，简单的节点名称或者 StepItem 格式的对象
     */
    public addStep(step: string | StepItem): void {
        if (typeof step == 'string') {
            step = {title: step};
        }
        if (!step.status) {
            step.status = 'normal';
        }
        this.data.push(step);
        this.add.emit(this);
        this._changeDetector.markForCheck();
    }

    /**
     * 删除一个节点
     * @param index：要删除的节点索引
     */
    public removeStep(index: number): void {
        this.data.splice(index, 1);
        this.remove.emit(index);
        if (this.current == index) {
            this.current = this.data.findIndex(item => !item.disabled);
        } else if (this.current > index) {
            this.current = this.current - 1;
        }
        this._changeDetector.markForCheck();
    }
}

@NgModule({
    imports: [CommonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawSteps],
    exports: [JigsawSteps]
})
export class JigsawStepsModule {
}
