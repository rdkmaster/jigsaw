import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, NgZone} from "@angular/core";
import {ProgressBase, Status} from "./base";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@Component({
    selector: "jigsaw-circle-progress, j-circle-progress",
    templateUrl: "circle-progress.html",
    host: {
        "[class.jigsaw-circle-progress-host]": "true",
        "[class.jigsaw-circle-progress-processing]": "status === 'processing'",
        "[class.jigsaw-circle-progress-success]": "status === 'success'",
        "[class.jigsaw-circle-progress-block]": "status === 'block'",
        "[class.jigsaw-circle-progress-error]": "status === 'error'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawCircleProgress extends ProgressBase {
    constructor(private _detector: ChangeDetectorRef, protected _zone: NgZone, protected _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(_cdr);
        this._updateSize(92 /* default diameter */);
    }

    /**
     * @internal
     */
    public _$strokeWidth = 8;

    /**
     * @internal
     */
    public _$svgWidth: number;

    /**
     * @internal
     */
    public _$radius: number;

    /**
     * @internal
     */
    public _$center: number;

    /**
     * @internal
     */
    public _$offset: number;

    /**
     * @internal
     */
    public _$circumference: number;

    /**
     * @internal
     */
    public get _$percent(): string {
        return this._$validPercent ? this.value.toFixed(2) : '--';
    }

    protected _value: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        value = typeof value != "number" ? parseFloat(value) : value;
        this._value = isNaN(value) ? 0 : Math.min(value, 100);
        this.runMicrotask(() => {
            this._$offset = this._$circumference - this._value / 100 * this._$circumference;
            this._detector.markForCheck();
        })
    }

    /**
     * @internal
     */
    public get _$validPercent(): boolean {
        return !isNaN(this.value);
    }

    protected _status: Status = "processing";
    @Input()
    @RequireMarkForCheck()
    public get status(): "processing" | "block" | "error" | "success" {
        return this._status;
    }

    public set status(value: "processing" | "block" | "error" | "success") {
        this._status = value;
    }

    private _diameter: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get diameter(): number {
        return this._diameter;
    }

    public set diameter(value: number) {
        this._diameter = value;
        this._updateSize(value);
    }

    private _updateSize(diameter: number) {
        diameter = typeof diameter != "number" ? parseFloat(diameter) : diameter;
        if (isNaN(diameter) || diameter < 0) {
            return;
        }
        this._$svgWidth = diameter + this._$strokeWidth * 2;
        this._$radius = diameter / 2;
        this._$center = this._$svgWidth / 2;
        this._$circumference = diameter * Math.PI;
    }

    protected _updateProgress(value: number): void {
        this.value = value;
    }

    protected _processInitData(): void {
        this.value = this.initData.value;
        this.status = this.initData.status;
        this.diameter = this.initData.diameter;
    }
}
