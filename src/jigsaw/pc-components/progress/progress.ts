import {ChangeDetectionStrategy, Component, NgModule, Input, ElementRef, ChangeDetectorRef, OnInit} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {CommonModule} from '@angular/common';

export class EstimateInfo {
    // 假进度更新的间隔，比如人家给定3000ms，那么我们可以在±300ms范围内随机更新进度
    interval: number = 3000;
    // 每个周期更新的进度增量值
    increment: number = 15;
    minProgress: number = 0;
    maxProgress: number = 80;
    curProgress: number;
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
export class JigsawProgress extends AbstractJigsawComponent implements OnInit {
    constructor(private _hostElRef: ElementRef, private _cdr: ChangeDetectorRef) {
        super()
    }

    private _value: string = '0%';
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value) {
        if(value == this._value) return;
        this._value = value;
        Promise.resolve().then(() => {
            this._autoLabelPosition();
        })
    }

    @Input()
    public split: boolean;

    @Input()
    public labelPosition: 'left' | 'right' | 'top' |'followLeft' | 'followRight' = 'right';

    @Input() public status: 'processing' | 'block' | 'error' | 'success' = 'processing';

    @Input() public preSize: 'default' | 'small' | 'large' = 'default';

    @Input() public processing: boolean;

    @Input() public estimate: boolean;

    @Input() public estimateInfo: EstimateInfo = new EstimateInfo();

    public _$labelPositionBak: 'followLeft' | 'followRight' = 'followRight';
    private _autoLabelPosition() {
        if(this.labelPosition != 'followLeft' && this.labelPosition != 'followRight') return;
        let hostEl = this._hostElRef.nativeElement;
        let [trackEl, valueEl, labelEl] = [hostEl.querySelector('.jigsaw-progress-bar-track'),
            hostEl.querySelector('.jigsaw-progress-bar-track-value'),
            hostEl.querySelector('.jigsaw-progress-bar-track-label')];
        if(!trackEl || !valueEl || !labelEl) return;
        if(this.labelPosition == 'followLeft') {
            this._$labelPositionBak = labelEl.offsetWidth < valueEl.offsetWidth ? 'followLeft' : 'followRight';
        } else if (this.labelPosition == 'followRight' && labelEl.offsetWidth + valueEl.offsetWidth >= trackEl.offsetWidth) {
            this._$labelPositionBak = labelEl.offsetWidth + valueEl.offsetWidth < trackEl.offsetWidth ? 'followRight' : 'followLeft';
        }
        this._cdr.markForCheck();
    }

    private _random(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    public estimateProgress(es: EstimateInfo = new EstimateInfo()) {
        es.curProgress = es.curProgress ? es.curProgress : es.minProgress;
        this.value = es.curProgress + '%';
        this._cdr.markForCheck();
        this.callLater(() => {
            es.curProgress += es.increment;
            if(es.curProgress > es.maxProgress) {
                es.curProgress = es.maxProgress;
                this.value = es.curProgress + '%';
                this._cdr.markForCheck();
            } else {
                this.estimateProgress(es);
            }
        }, this._random(es.interval - 300, es.interval + 300))
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.estimate) {
            this.estimateProgress(this.estimateInfo)
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
