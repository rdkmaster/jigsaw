import {Component, Input, Type, ViewChild} from "@angular/core";
import {AbstractGraphData} from "jigsaw/common/core/data/graph-data";
import {EchartOptions} from "jigsaw/common/core/data/echart-types";
import {JigsawGraph} from "jigsaw/pc-components/graph/graph";
import {MonitorService} from "./monitor-service";
import {AbstractMonitorsBase} from "./monitors-base";
import {ToolbarComp} from "../comp/toolbar.comp";

export class GraphData extends AbstractGraphData {
    echartsOptions: EchartOptions;

    constructor(data: EchartOptions) {
        super();
        this.echartsOptions = data;
    }

    protected createChartOptions(): EchartOptions {
        return this.echartsOptions;
    }
}

@Component({
    selector: 'graph-monitor',
    template: `
        <div class="wrapper" (mouseover)="_showToolbar = true" (mouseleave)="_showToolbar = false">
            <jx-toolbar (remove)="removeKPI()" [component]="getComponent" [data]="data"
                        [visible]="_showToolbar" [chartId]="chartId">
            </jx-toolbar>
            <jigsaw-graph [data]="_graphData" width="99%" height="99%"></jigsaw-graph>
        </div>
    `,
    styles: [`
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #fff;
        }
    `]
})
export class GraphMonitorComponent extends AbstractMonitorsBase {

    @ViewChild(ToolbarComp)
    protected toolbar: ToolbarComp;

    @ViewChild(JigsawGraph)
    private _graph: JigsawGraph;

    public _showToolbar = false;
    public _graphData: GraphData;
    private _data: EchartOptions;

    @Input()
    index: number = 1;

    constructor(private _ms: MonitorService) {
        super();
    }

    @Input()
    get data(): EchartOptions {
        return this._data;
    }

    set data(value: EchartOptions) {
        this.chartId = value.chartID;
        this._data = value;

        // 加上延迟时间让图形不要扎堆渲染，导致页面瞬间卡顿
        setTimeout(() => {
            this._graph.resize();
            this._graphData = new GraphData(value);
        }, 100 + 250 * this.index);
    }

    public removeKPI() {
        this._ms.removeIndicator(this.chartId);
    }

    public getComponent(): Type<AbstractMonitorsBase> {
        return GraphMonitorComponent;
    }
}
