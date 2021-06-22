import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, Output, Directive } from "@angular/core";
import {AbstractJigsawComponent} from "../../common/common";
import {IPopupable} from "../../common/service/popup.service";
import {InternalUtils} from "../../common/core/utils/internal-utils";

export class EstimationInfo {
    duration: number = 10000;
    maxProgress: number = 80;
    timer: any;
    increment: number;
}

export type LabelPosition = 'left' | 'right' | 'top' | 'followLeft' | 'followRight' | 'none';
export type Status = 'processing' | 'block' | 'error' | 'success';
export type PreSize = 'default' | 'small' | 'large';
export type ProgressInitData = {
    value?: number, showMarker?: boolean, status?: Status, animate?: boolean,
    labelPosition?: LabelPosition, preSize?: PreSize, diameter?: number
};

@Directive()
export abstract class ProgressBase extends AbstractJigsawComponent implements OnDestroy, OnInit, IPopupable {
    protected constructor(protected _cdr: ChangeDetectorRef) {
        super();
    }

    @Output()
    public estimationStopped = new EventEmitter<number>();

    public answer: EventEmitter<any>;
    public initData: ProgressInitData;
    public value: number;
    public status: Status = "processing";

    protected abstract _updateProgress(value: number): void;
    protected abstract _processInitData(): void;

    protected _estimationInfo: EstimationInfo;

    /**
     * 不是所有情况下都可以给定精确的进度值，但虽然这样的事务无法精确计算进度，但其大约需要花掉的时间，是相对容易预估出来的。
     * 此时，可以调用此方法来让进度条继续往前走，给用户一个假象，这样比进度条卡着不动的体验会好许多，能有效缓解用户的焦虑感。
     *
     * @param duration 从当前进度到`maxProgress`估计需要持续的时长，单位：毫秒数
     * @param maxProgress 在估计进度值的过程中，进度条的值将随机递增，最大到达这个值后终止
     * @param interval 更新进度的间隔，单位：毫秒数
     */
    public startEstimating(duration: number = 10000, maxProgress: number = 80, interval: number = 800): void {
        maxProgress = Math.min(maxProgress, 99.9);
        if (this.value >= maxProgress) {
            return;
        }
        this.stopEstimating();
        this._estimationInfo = new EstimationInfo();
        this._estimationInfo.maxProgress = maxProgress;
        this._estimationInfo.duration = duration;
        this._estimationInfo.increment = (maxProgress - this.value) / (duration / interval);
        this._updateProgress(this.value + this._estimationInfo.increment);
        this._estimationInfo.timer = setInterval(() => {
            if (this.value >= maxProgress) {
                this.stopEstimating();
                return;
            }
            const increment = InternalUtils.randomNumber(this._estimationInfo.increment * .9, this._estimationInfo.increment * 1.1);
            this._updateProgress(Math.min(this.value + increment, this._estimationInfo.maxProgress));
            this._cdr.markForCheck();
        }, interval);
    }

    /**
     * 提前终止`startEstimating`方法启动的进度估计过程
     */
    public stopEstimating(suppressEvent: boolean = false): void {
        if (!this._estimationInfo) {
            return;
        }
        this.clearCallLater(this._estimationInfo.timer);
        this._estimationInfo = null;
        if (!suppressEvent) {
            this.estimationStopped.emit(this.value);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.initData) {
            this._processInitData();
        }
    }
}
