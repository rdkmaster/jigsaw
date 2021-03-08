import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ChangeDetectorRef,
    NgZone
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { CommonModule } from "@angular/common";

@Component({
    selector: "jigsaw-circle-progress, j-circle-progress",
    templateUrl: "circle-progress.html",
    host: {
        "[class.jigsaw-circle-progress-host]": "true",
        "[class.jigsaw-circle-progress-primary]": "status === 'primary'",
        "[class.jigsaw-circle-progress-success]": "status === 'success'",
        "[class.jigsaw-circle-progress-warning]": "status === 'warning'",
        "[class.jigsaw-circle-progress-error]": "status === 'error'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawCircleProgress extends AbstractJigsawComponent implements OnInit{
    constructor(private _detector: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

    ngOnInit() {
        if (!this._circleWidth){
            this.circleWidth = 92;
        }
    }

    /**
     * @internal
     */
    public get _$percent(): string {
        if (this._$countDecimals === 0) {
            return this._$validPercent ? this.percent.toString() : "--";
        } else if (this._$countDecimals === 1) {
            return this._$validPercent ? this.percent.toString() : "--";
        } else {
            const fractions = 2;
            return this._$validPercent ? this.percent.toFixed(fractions) : "--";
        }
    }

    private _percent: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get percent(): number {
        return this._percent;
    }

    public set percent(value: number) {
        this._percent = typeof value != "number" ? parseFloat(value) : value;
        this.runMicrotask(()=>{
            this._$offset = this._$circumference - this._percent / 100 * this._$circumference;
            this._detector.markForCheck();
        })
    }

    /**
     * @internal
     */
    public get _$validPercent(): boolean {
        return !isNaN(this.percent);
    }

    /**
     * @internal
     */
    public get _$countDecimals(): number {
        if(Math.floor(this.percent) === this.percent) return 0;
        return this.percent.toString().split(".")[1].length || 0; 
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public status: "primary" | "success" | "warning" | "error" = "primary";

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

    private _circleWidth:number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get circleWidth(): number {
        return this._circleWidth;
    }

    public set circleWidth(value: number) {
        this._circleWidth =
            typeof value != "number" ? parseFloat(value) : value;
        this._$svgWidth = this._circleWidth + this._$strokeWidth * 2;
        this._$radius = this._circleWidth / 2;
        this._$center = this._$svgWidth / 2;
        this._$circumference = this._circleWidth * Math.PI;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawCircleProgress],
    exports: [JigsawCircleProgress]
})
export class JigsawCircleProgressModule {}
