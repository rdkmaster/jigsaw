import { Directive, ElementRef, Input, OnInit, NgModule } from '@angular/core';
import {
    ChartIconBar,
    ChartIconCustomPie,
    ChartIconDonut, ChartIconFactory,
    ChartIconLine,
    ChartIconPie,
    ChartType
} from "../../../pc-components/chart-icon/chart-icon-factory";
import {AbstractJigsawViewBase} from "../../common";
import {TimeGr} from "../../service/time.service";

@Directive({
    selector: '[jigsawChartIcon], [jigsaw-chart-icon]'
})
export class JigsawChartIconDirective extends AbstractJigsawViewBase implements OnInit {

    constructor(private _elRef: ElementRef) {
        super();
    }

    private _chartType: ChartType;

    @Input()
    get chartType(): ChartType | string {
        return this._chartType;
    }

    set chartType(value: ChartType | string) {
        if (typeof value === 'string') {
            value = ChartType[value];
        }
        this._chartType = <ChartType>value;
    }

    @Input()
    public options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie;

    public refresh() {
        ChartIconFactory.create(<HTMLElement>this._elRef.nativeElement, this._chartType, this.options);
    }

    ngOnInit() {
        super.ngOnInit();
        this.runMicrotask(() => {
            this.refresh();
        })
    }
}


@NgModule({
    declarations: [JigsawChartIconDirective],
    exports: [JigsawChartIconDirective]
})
export class JigsawChartIconModule {

}
