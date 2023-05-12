import {Component, ElementRef, Injector, Input, NgModule, OnInit, Directive, ChangeDetectionStrategy, NgZone} from '@angular/core';
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
import {JigsawThemeService} from "../../common/core/theming/theme";

@Directive()
export abstract class JigsawChartIconBase extends AbstractJigsawViewBase implements OnInit {
    constructor(protected _elementRef: ElementRef, protected _injector: Injector, protected _zone: NgZone, protected _themeService: JigsawThemeService) {
        super(_zone);
    }

    private _data: number[];

    @Input()
    @RequireMarkForCheck()
    public get data(): number[] {
        return this._data;
    }

    public set data(value: number[]) {
        this._data = typeof value == 'string' ? (<string>value).split(',').map(v => Number(v)) : value;
        if (this.initialized) {
            this.runAfterMicrotasks(() => {
                // 等待span内绑定的data刷新
                this._change();
            })
        }
    }

    protected _chartType: ChartType;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public delimiter: string = ',';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public width: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public height: number;

    protected abstract createOptions(): ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar;

    private _chartIcon: any;

    private _init() {
        const span = this._elementRef.nativeElement.querySelector('span')
        this._chartIcon = ChartIconFactory.create(span, this._chartType, this.createOptions());
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
        '[class.jigsaw-chart-icon-host]': 'true',
        '[class.jigsaw-pie-chart-icon]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawPieChartIcon extends JigsawChartIconBase {

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fill: string[] | ((...any) => string) = this._themeService.getGraphTheme().color;

    /**
     * @NoMarkForCheckRequired
     */
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
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDonutChartIcon extends JigsawChartIconBase {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fill: string[] = this._themeService.getGraphTheme().color;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public radius: number = 12;

    /**
     * @NoMarkForCheckRequired
     */
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
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawLineChartIcon extends JigsawChartIconBase {

    protected _chartType: ChartType = ChartType.line;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fill: string = this._themeService.getGraphTheme().color[3];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public width: number = 50;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public height: number = 24;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public max: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public min: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public stroke: string = this._themeService.getGraphTheme().color[0];

    /**
     * @NoMarkForCheckRequired
     */
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
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawBarChartIcon extends JigsawChartIconBase {

    protected _chartType: ChartType = ChartType.bar;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fill: string[] = this._themeService.getGraphTheme().color;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public max: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public min: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public padding: number = 0.1;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public width: number = 50;

    /**
     * @NoMarkForCheckRequired
     */
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
