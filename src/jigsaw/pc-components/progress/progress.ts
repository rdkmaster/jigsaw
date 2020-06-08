import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from "../../common/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {IPopupable, PopupInfo, PopupPositionType, PopupService} from "../../common/service/popup.service";

class EstimationInfo {
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
    labelPosition?: LabelPosition, preSize?: PreSize
};

@Component({
    selector: 'jigsaw-progress, j-progress',
    templateUrl: './progress.html',
    host: {
        '[class.jigsaw-progress]': 'true',
        '[class.jigsaw-progress-processing]': 'status == "processing"',
        '[class.jigsaw-progress-block]': 'status == "block"',
        '[class.jigsaw-progress-error]': 'status == "error"',
        '[class.jigsaw-progress-success]': 'status == "success"',
        '[class.jigsaw-progress-default]': 'preSize == "default"',
        '[class.jigsaw-progress-small]': 'preSize == "small"',
        '[class.jigsaw-progress-large]': 'preSize == "large"',
        '[style.width]': 'width',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawProgress extends AbstractJigsawComponent implements OnDestroy, OnInit, IPopupable {
    constructor(private _hostElRef: ElementRef, private _cdr: ChangeDetectorRef) {
        super()
    }

    public answer: EventEmitter<any>;
    public initData: ProgressInitData;

    private _value: number = 0;

    @Input()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this.stopEstimating();
        this._updateProgress(value);
    }

    private _updateProgress(value: number): void {
        // 留小1位数点
        value = isNaN(value) ? 0 : Math.round(value * 10) / 10;
        if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        if (value == this._value) {
            return;
        }
        this._value = value;
        this._autoLabelPosition();
        this._cdr.markForCheck();
    }

    @Input()
    public showMarker: boolean;

    private _labelPosition: LabelPosition = 'right';

    @Input()
    public get labelPosition(): LabelPosition {
        return this._labelPosition;
    }

    public set labelPosition(value: LabelPosition) {
        this._labelPosition = value;
        this._autoLabelPosition();
    }

    @Input()
    public status: Status = 'processing';

    @Input()
    public preSize: PreSize = 'default';

    @Input()
    public animate: boolean = true;

    @Output()
    public estimationStopped = new EventEmitter<number>();

    /**
     * @internal
     */
    public _$followingLabelPosition: 'followLeft' | 'followRight' = 'followRight';

    private _autoLabelPosition() {
        if (this._labelPosition != 'followLeft' && this._labelPosition != 'followRight') {
            return;
        }
        const hostEl = this._hostElRef.nativeElement;
        if (!hostEl) {
            return;
        }
        const trackEl = hostEl.querySelector('.jigsaw-progress-bar-track');
        if (!trackEl) {
            return;
        }
        // 滑动的过程有动画，导致这里读取到的元素尺寸错误，这里只能估算了，无法获得精确值。
        // 此时，99%这个label的尺寸大约是67px，0%大约是52px，value的宽度则可以通过进度值按比例计算到
        const valueWidth = trackEl.offsetWidth * this.value / 100;
        const maxLabelWidth = 67, minLabelWidth = 52;

        if (maxLabelWidth + valueWidth >= trackEl.offsetWidth) {
            this._$followingLabelPosition = 'followLeft';
        } else if (minLabelWidth > valueWidth) {
            this._$followingLabelPosition = 'followRight';
        } else {
            this._$followingLabelPosition = this._labelPosition;
        }
        this._cdr.markForCheck();
    }

    private _estimationInfo: EstimationInfo;

    /**
     * 不是所有任何情况下都可以给定精确的进度值的，但一个事务大约需要花掉的时间，是相对容易预估出来的。
     * 此时，可以调用此方法来让进度条继续往前走，给用户一个假象，这样比卡着不动的体验会好许多。
     *
     * @param duration 从当前进度到`maxProgress`估计需要持续的时长，单位：毫秒数
     * @param maxProgress 在估计进度值的过程中，进度条的值将随机递增，最大到达这个值后终止
     * @param interval 更新进度的间隔，单位：毫秒数
     */
    public startEstimating(duration: number = 10000, maxProgress: number = 80, interval: number = 800): void {
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

    public static showDockingBar(value: number):PopupInfo {
        const initData: ProgressInitData = {value};
        initData.preSize = 'small';
        initData.labelPosition = 'none';
        initData.showMarker = false;
        initData.status = 'processing';
        initData.animate = false;
        return PopupService.instance.popup(JigsawProgress, {
            modal: false, pos: document.body, posType: PopupPositionType.fixed, size: {width: '100%'}
        }, initData);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.stopEstimating(true);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.initData) {
            this.value = this.initData.value;
            this.showMarker = this.initData.showMarker;
            this.labelPosition = this.initData.labelPosition;
            this.status = this.initData.status;
            this.preSize = this.initData.preSize;
            this.animate = this.initData.animate;
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress],
    exports: [JigsawProgress]
})
export class JigsawProgressModule {

}
