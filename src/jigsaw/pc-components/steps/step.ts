import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";
import {CommonUtils} from "../../common/core/utils/common-utils";

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
    disabled?: boolean;
    index?: number;
};

@WingsTheme('jigsaw-step')
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

    @Output()
    public titleChange = new EventEmitter<StepItem>();

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
     * @param index：可选的插入位置索引，不指定则插入在末尾
     */
    public addStep(step: string | StepItem, index?: number): void {
        if (typeof step == 'string') {
            step = {title: step};
        }
        if (!step.status) {
            step.status = 'normal';
        }
        const i = CommonUtils.isDefined(index) && typeof index == 'number' ? index : this.data.length;
        this.data.splice(i, 0, step);
        this.add.emit(this);
        this._changeDetector.markForCheck();
    }

    /**
     * 删除一个节点
     * @param index：要删除的节点索引
     */
    public removeStep(index: number): void {
        if (CommonUtils.isUndefined(index) || typeof index != "number" || index < 0 || index > this.data.length - 1) {
            // +null和Number(null)都是0，并且isNaN(null)=false
            // 这里只能直接判断是否为空
            return;
        }
        this.data.splice(index, 1);
        this.remove.emit(index);
        if (this.current == index) {
            this.current = this._findNeighboring(index);
        } else if (this.current > index) {
            this.current = this.current - 1;
        }
        this._changeDetector.markForCheck();
    }

    /**
     * 修改步骤信息
     * @param step: 可以只传入字符串修改title，也可以传入一个节点对象，修改整个节点信息
     * @param index
     */
    public renameStep(step: string | StepItem, index: number): void {
        let target = this.data[index];
        if (CommonUtils.isUndefined(target)) {
            return;
        }
        if (typeof step == 'string') {
            target.title = step;
        } else {
            this.data.splice(index, 1, step);
            target = step;
        }
        this.titleChange.emit({
            title: target.title,
            index: index
        });
        this._changeDetector.markForCheck();
    }

    // 找删除节点附近的非disabled节点
    private _findNeighboring(index: number): number {
        let idx = 0;
        // 因为data里面已经将index位置上的元素删除了，所以这里要从i=0开始计算
        for (let i = 0, len = this.data?.length || 0; i < len && idx >= 0 && idx < len; i++) {
            // 往后计算时，i从0开始，也就是当前位置，其实就是原来的index+1的位置
            idx = index + i;
            if (!!this.data[idx] && !this.data[idx].disabled) {
                break;
            }
            // 往前计算时，要多减1
            idx = index - (i + 1);
            if (!!this.data[idx] && !this.data[idx].disabled) {
                break;
            }
        }
        return !!this.data[idx] ? idx : -1;
    }
}

@NgModule({
    imports: [CommonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawSteps],
    exports: [JigsawSteps]
})
export class JigsawStepsModule {
}
