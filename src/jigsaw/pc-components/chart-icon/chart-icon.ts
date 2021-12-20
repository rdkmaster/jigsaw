import {Component, ElementRef, Injector, Input, NgModule, OnInit} from '@angular/core';
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
import {JigsawTheme} from "../../common/core/theming/theme";

export class JigsawChartIconBase extends AbstractJigsawViewBase implements OnInit {

    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
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
        if (this.initialized) {
            this.runMicrotask(() => {
                this._change();
            })
        }
    }

    protected _chartType: ChartType;

    protected _options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get options(): ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie {
        return this._options;
    }

    public set options(value: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie) {
        this._options = value;
    }

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

@Component({
    selector: 'jigsaw-pie-chart-icon, j-pie-chart-icon',
    templateUrl: './chart-icon.html',
    host: {
        '[class.jigsaw-chart-icon]': 'true',
        '[class.jigsaw-pie-chart-icon]': 'true',
    }
})
export class JigsawPieChartIcon extends JigsawChartIconBase {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
        super(_elementRef, _injector);
    }
    protected _chartType: ChartType = ChartType.pie;
    protected _options: ChartIconPie = {
        fill: JigsawTheme.getGraphTheme().color,
        radius: 32
    };
}

@Component({
    selector: 'jigsaw-donut-chart-icon, j-donut-chart-icon',
    templateUrl: './chart-icon.html',
    host: {
        '[class.jigsaw-chart-icon]': 'true',
        '[class.jigsaw-donut-chart-icon]': 'true',
    }
})
export class JigsawDonutChartIcon extends JigsawChartIconBase {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
        super(_elementRef, _injector);
    }
    protected _chartType: ChartType = ChartType.donut;
    protected _options: ChartIconDonut = {
        fill: JigsawTheme.getGraphTheme().color,
        height: 64,
        width: 64
    };
}

@Component({
    selector: 'jigsaw-line-chart-icon, j-line-chart-icon',
    templateUrl: './chart-icon.html',
    host: {
        '[class.jigsaw-chart-icon]': 'true',
        '[class.jigsaw-line-chart-icon]': 'true',
    }
})
export class JigsawLineChartIcon extends JigsawChartIconBase {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
        super(_elementRef, _injector);
    }
    protected _chartType: ChartType = ChartType.line;
    protected _options: ChartIconLine = {
        fill: JigsawTheme.getGraphTheme().color[0],
        height: 64,
        width: 100
    };
}

@Component({
    selector: 'jigsaw-bar-chart-icon, j-bar-chart-icon',
    templateUrl: './chart-icon.html',
    host: {
        '[class.jigsaw-chart-icon]': 'true',
        '[class.jigsaw-bar-chart-icon]': 'true',
    }
})
export class JigsawBarChartIcon extends JigsawChartIconBase {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
        super(_elementRef, _injector);
    }
    protected _chartType: ChartType = ChartType.bar;
    /**
     * @NoMarkForCheckRequired
     */
    protected _options: ChartIconBar = {
        fill: JigsawTheme.getGraphTheme().color,
        height: 64,
        width: 100
    };
}

@NgModule({
    declarations: [JigsawPieChartIcon, JigsawDonutChartIcon, JigsawLineChartIcon, JigsawBarChartIcon],
    exports: [JigsawPieChartIcon, JigsawDonutChartIcon, JigsawLineChartIcon, JigsawBarChartIcon]
})
export class JigsawChartIconModule {
}

export * from './chart-icon-factory';
