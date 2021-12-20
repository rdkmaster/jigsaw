import {Component, ElementRef, Injector, Input, NgModule, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
    ChartIconBar,
    ChartIconDonut,
    ChartIconFactory,
    ChartIconLine,
    ChartIconPie,
    ChartType
} from "./chart-icon-factory";
import {AbstractJigsawViewBase} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {JigsawTheme} from "../../common/core/theming/theme";

export abstract class JigsawChartIconBase extends AbstractJigsawViewBase implements OnInit, OnChanges {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector) {
        super();
    }

    private _data: number[];

    @Input()
    @RequireMarkForCheck()
    public get data(): number[] {
        return this._data;
    }

    public set data(value: number[]) {
        this._data = typeof value == 'string' ? (<string>value).split(',').map(v => Number(v)) : value;
    }

    protected _chartType: ChartType;

    @Input()
    public delimiter: string = ',';
    @Input()
    public width: number;
    @Input()
    public height: number;

    protected abstract createOptions(): ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar;

    private _chartIcon: any;

    private _init() {
        const span = this._elementRef.nativeElement.querySelector('span')
        this._chartIcon = ChartIconFactory.create(span, this._chartType, this.createOptions());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.initialized) {
            return;
        }
        const keys = Object.keys(changes);
        if (keys.length == 1 && keys[0] == 'data') {
            this._change();
        } else {
            this._init();
        }
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
    @Input()
    public fill: string[] | ((...any) => string) = JigsawTheme.getGraphTheme().color;
    @Input()
    public radius: number = 12;

    protected _chartType: ChartType = ChartType.pie;

    protected createOptions(): ChartIconPie {
        return {
            fill: this.fill, radius: this.radius, width: this.width, height: this.height, delimiter: this.delimiter
        };
    }
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
    @Input()
    public fill: string[] = JigsawTheme.getGraphTheme().color;
    @Input()
    public radius: number = 12;
    @Input()
    public innerRadius: number = 0;

    protected _chartType: ChartType = ChartType.donut;

    protected createOptions(): ChartIconDonut {
        return {
            fill: this.fill, radius: this.radius, width: this.width, height: this.height,
            delimiter: this.delimiter, innerRadius: this.innerRadius || this.radius / 2
        };
    }
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
    protected _chartType: ChartType = ChartType.line;
    @Input()
    public fill: string;
    @Input()
    public width: number = 100;
    @Input()
    public height: number = 24;
    @Input()
    public max: number = 0;
    @Input()
    public min: number = 0;
    @Input()
    public stroke: string = JigsawTheme.getGraphTheme().color[0];
    @Input()
    public strokeWidth: number = 1;

    protected createOptions(): ChartIconLine {
        return {
            fill: this.fill, width: this.width, height: this.height, delimiter: this.delimiter,
            max: this.max, min: this.min, stroke: this.stroke, strokeWidth: this.strokeWidth
        };
    }
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
    protected _chartType: ChartType = ChartType.bar;
    @Input()
    public fill: string[] = JigsawTheme.getGraphTheme().color;
    @Input()
    public max: number = 0;
    @Input()
    public min: number = 0;
    @Input()
    public padding: number = 0.1;
    @Input()
    public width: number = 100;
    @Input()
    public height: number = 24;

    protected createOptions(): ChartIconBar {
        return {
            fill: this.fill, width: this.width, height: this.height, delimiter: this.delimiter,
            max: this.max, min: this.min, padding: this.padding
        };
    }
}

@NgModule({
    declarations: [JigsawPieChartIcon, JigsawDonutChartIcon, JigsawLineChartIcon, JigsawBarChartIcon],
    exports: [JigsawPieChartIcon, JigsawDonutChartIcon, JigsawLineChartIcon, JigsawBarChartIcon]
})
export class JigsawChartIconModule {
}

export * from './chart-icon-factory';
