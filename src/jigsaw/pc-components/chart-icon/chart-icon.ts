import {ChangeDetectorRef, Component, ElementRef, Input, NgModule, OnInit, Injector} from '@angular/core';
import {
    ChartIconBar,
    ChartIconCustomPie,
    ChartIconDonut,
    ChartIconFactory,
    ChartIconLine,
    ChartIconPie,
    ChartType
} from "./chart-icon-factory";
import {AbstractJigsawViewBase} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@Component({
    selector: 'jigsaw-chart-icon, j-chart-icon',
    template: `
        <span>{{data.join(',')}}</span>
    `,
    host: {
        '[class.jigsaw-chart-icon]': 'true',
    }
})
export class JigsawChartIcon extends AbstractJigsawViewBase implements OnInit {

    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef, private _injector: Injector) {
        super();
    }

    private _chartIcon: any;

    private _data: number[];

    @Input()
    @RequireMarkForCheck()
    public get data(): number[] {
        return this._data;
    }

    public set data(value: number[]) {
        this._data = typeof value == 'string' ? (<string>value).split(',').map(v => Number(v)) : value;
        this.runMicrotask(() => {
            this._change();
        })
    }

    private _chartType: ChartType;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get chartType(): ChartType | string {
        return this._chartType;
    }

    public set chartType(value: ChartType | string) {
        // chartType类型只能设置一次，后面修改会使图形渲染不出来
        if (typeof value === 'string') {
            value = ChartType[value];
        }
        this._chartType = <ChartType>value;
        if (this._chartType === ChartType.customPie) {
            ChartIconFactory.registerCustomPie();
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie;

    private _init() {
        this._chartIcon = ChartIconFactory.create(this._elementRef.nativeElement.querySelector('span'), this._chartType, this.options);
    }

    private _change() {
        if (this._chartIcon) {
            this._chartIcon.change();
        } else {
            this._init();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.runMicrotask(() => {
            this._init();
        })
    }
}


@NgModule({
    declarations: [JigsawChartIcon],
    exports: [JigsawChartIcon]
})
export class JigsawChartIconModule {

}
