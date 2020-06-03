import {
    ChangeDetectionStrategy,
    Component,
    NgModule,
    Input,
    ElementRef,
    ChangeDetectorRef,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from "../../common/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";

class EstimationInfo {
    duration: number = 10000;
    maxProgress: number = 80;
    timer: any;
    increment: number;
}

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
export class JigsawProgress extends AbstractJigsawComponent implements OnDestroy {
    constructor(private _hostElRef: ElementRef, private _cdr: ChangeDetectorRef) {
        super()
    }

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
        if (value == this._value) {
            return;
        }
        this._value = value;
        Promise.resolve().then(() => {
            this._autoLabelPosition();
        });
    }

    @Input()
    public split: boolean;

    @Input()
    public labelPosition: 'left' | 'right' | 'top' | 'followLeft' | 'followRight' = 'right';

    @Input()
    public status: 'processing' | 'block' | 'error' | 'success' = 'processing';

    @Input()
    public preSize: 'default' | 'small' | 'large' = 'default';

    @Input()
    public animate: boolean = true;

    @Output()
    public estimationStopped = new EventEmitter<number>();

    public _$labelPositionBak: 'followLeft' | 'followRight' = 'followRight';

    private _autoLabelPosition() {
        if (this.labelPosition != 'followLeft' && this.labelPosition != 'followRight') {
            return;
        }
        let hostEl = this._hostElRef.nativeElement;
        let [trackEl, valueEl, labelEl] = [hostEl.querySelector('.jigsaw-progress-bar-track'),
            hostEl.querySelector('.jigsaw-progress-bar-track-value'),
            hostEl.querySelector('.jigsaw-progress-bar-track-label')];
        if (!trackEl || !valueEl || !labelEl) {
            return;
        }
        if (this.labelPosition == 'followLeft') {
            this._$labelPositionBak = labelEl.offsetWidth < valueEl.offsetWidth ? 'followLeft' : 'followRight';
        } else if (this.labelPosition == 'followRight' && labelEl.offsetWidth + valueEl.offsetWidth >= trackEl.offsetWidth) {
            this._$labelPositionBak = labelEl.offsetWidth + valueEl.offsetWidth < trackEl.offsetWidth ? 'followRight' : 'followLeft';
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

    ngOnDestroy() {
        super.ngOnDestroy();
        this.stopEstimating(true);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress],
    exports: [JigsawProgress]
})
export class JigsawProgressModule {

}
