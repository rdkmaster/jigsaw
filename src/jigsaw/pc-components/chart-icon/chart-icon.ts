import {ChangeDetectorRef, Component, ElementRef, Input, NgModule, OnInit} from '@angular/core';
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

@Component({
    selector: 'jigsaw-chart-icon, j-chart-icon',
    template: `
        <span>{{data}}</span>
    `,
    host: {
        '[class.jigsaw-chart-icon]': 'true',
    }
})
export class JigsawChartIcon extends AbstractJigsawViewBase implements OnInit {

    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
        super();
    }

    private _chartIcon: any;

    private _data: string;
    @Input()
    get data(): (string | number)[] | string {
        return this._data;
    }

    set data(value: (string | number)[] | string) {
        this._data = value instanceof Array ? value.join(',') : value;
        this.runMicrotask(() => {
            this.change();
        })
    }

    private _chartType: ChartType;

    @Input()
    get chartType(): ChartType | string {
        return this._chartType;
    }

    set chartType(value: ChartType | string) {
        // chartType类型只能设置一次，后面修改会使图形渲染不出来
        if (typeof value === 'string') {
            value = ChartType[value];
        }
        this._chartType = <ChartType>value;
        if (this._chartType === ChartType.customPie) {
            ChartIconFactory.registerCustomPie();
        }
    }

    @Input()
    public options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie;

    public refresh() {
        this._chartIcon = ChartIconFactory.create(this._elementRef.nativeElement.querySelector('span'), this._chartType, this.options);
    }

    public change() {
        if (this._chartIcon) {
            this._chartIcon.change();
        } else {
            this.refresh();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.runMicrotask(() => {
            this.refresh();
        })
    }
}


@NgModule({
    declarations: [JigsawChartIcon],
    exports: [JigsawChartIcon]
})
export class JigsawChartIconModule {

}
