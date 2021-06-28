import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    NgModule,
    OnDestroy,
    OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IPopupable, PopupInfo, PopupPositionType, PopupService} from "../../common/service/popup.service";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {JigsawCircleProgress} from "./circle-progress";
import {LabelPosition, PreSize, ProgressBase, ProgressInitData, Status} from "./base";

// @dynamic
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
export class JigsawProgress extends ProgressBase implements OnDestroy, OnInit, IPopupable {
    constructor(private _hostElRef: ElementRef, protected _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(_cdr);
    }

    public answer: EventEmitter<any>;
    public initData: ProgressInitData;

    protected _value: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this.stopEstimating();
        this._updateProgress(value);
    }

    protected _updateProgress(value: number): void {
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
        if (this.initialized) {
            this._autoLabelPosition();
        }
        this._cdr.markForCheck();
    }

    protected _processInitData() {
        this.value = this.initData.value;
        this.showMarker = this.initData.showMarker;
        this.labelPosition = this.initData.labelPosition;
        this.status = this.initData.status;
        this.preSize = this.initData.preSize;
        this.animate = this.initData.animate;
    }

    @Input()
    @RequireMarkForCheck()
    public showMarker: boolean;

    private _labelPosition: LabelPosition = 'right';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get labelPosition(): LabelPosition {
        return this._labelPosition;
    }

    public set labelPosition(value: LabelPosition) {
        this._labelPosition = value;
        if (this.initialized) {
            this._autoLabelPosition();
        }
    }

    protected _status: Status = 'processing';

    @Input()
    @RequireMarkForCheck()
    public get status(): Status {
        return this._status
    }

    public set status(status: Status) {
        if (!status || this._status == status) return;
        this._status = status;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public preSize: PreSize = 'default';

    @Input()
    @RequireMarkForCheck()
    public animate: boolean = true;

    /**
     * @internal
     */
    public _$followingLabelPosition: 'followLeft' | 'followRight' = 'followRight';

    private _autoLabelPosition() {
        if (this._labelPosition != 'followLeft' && this._labelPosition != 'followRight') {
            this._cdr.markForCheck();
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
        // 此时，99.1%这个label的尺寸大约是77px，0%大约是52px，value的宽度则可以通过进度值按比例计算到
        const valueWidth = trackEl.offsetWidth * this.value / 100;
        const maxLabelWidth = 77, minLabelWidth = 52;

        if (maxLabelWidth + valueWidth >= trackEl.offsetWidth) {
            this._$followingLabelPosition = 'followLeft';
        } else if (minLabelWidth > valueWidth) {
            this._$followingLabelPosition = 'followRight';
        } else {
            this._$followingLabelPosition = this._labelPosition;
        }
        this._cdr.markForCheck();
    }

    public static topProgressBar: PopupInfo;

    public static showDockingBar(value: number): PopupInfo {
        if (this.topProgressBar) {
            this.topProgressBar.dispose();
            this.topProgressBar = null;
        }
        const initData: ProgressInitData = {value};
        initData.preSize = 'small';
        initData.labelPosition = 'none';
        initData.showMarker = false;
        initData.status = 'processing';
        initData.animate = false;
        this.topProgressBar = PopupService.instance.popup(JigsawProgress, {
            modal: false, pos: document.body, posType: PopupPositionType.fixed, size: {width: '100%'}
        }, initData);
        return this.topProgressBar;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.stopEstimating(true);
    }

    ngOnInit() {
        super.ngOnInit();
        Promise.resolve().then(() => {
            this._autoLabelPosition();
        });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress, JigsawCircleProgress],
    exports: [JigsawProgress, JigsawCircleProgress]
})
export class JigsawProgressModule {
}
