import {Component, ComponentRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LayoutData} from "jigsaw/core/data/layout-data";
import {TableCellData, TableMonitorComponent} from "./monitors/table.comp";
import {GraphMonitorComponent} from "./monitors/graph.comp";
import {NewMonitorComponent} from "./monitors/new-monitor.comp";
import {MonitorService} from "./monitors/monitor-service";

@Component({
    selector: 'jigsaw-app',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MonitorComponent {
    period = 'fifteenminutes';
    viewData: LayoutData;
    cells = 0;
    toggleFullScreen;

    tableData: TableCellData[][];
    graphData: any[];

    constructor(public http: HttpClient, ms: MonitorService) {
        setInterval(() => this.pullData(), 30000);
        this.pullData();
        ms.events.subscribe(event => {
            switch (event.type) {
                case 'pull-data':
                    this.pullData();
                    break;
                case 'toggle-full-screen':
                    this.toggleFullScreen = event;
                    break;
            }
        });
    }

    pullData() {
        const graphUrl = `/monitor/statistics/dashboard/all?timeUnit=${this.period}`;
        this.http.get(graphUrl).subscribe((data: any[]) => this.updateViewGraphData(data));

        const tableUrl = '/monitor/statistics/datatable';
        this.http.get(tableUrl).subscribe((data: TableCellData[][]) => this.updateTableData(data));
    }

    updateViewGraphData(data: any[]) {
        this.graphData = data;

        // 固定第一行第一列给表格，最后一个框给+号，因此增加2
        if (this.viewData && this.cells != data.length + 2) {
            // need to update view
            this.viewData = null;
        }
        if (this.viewData) {
            this.feedData();
            return;
        }

        let view = [];
        // 固定第一行第一列给表格，最后一个框给+号，因此增加2
        this.cells = data.length + 2;
        const rows = Math.ceil(this.cells / 3);
        for (let i = 0; i < rows; i++) {
            const nodes = [];
            view.push({grow: this.cells % 3 == 1 && i == rows - 1 ? 3: 10, nodes: nodes});
            for (let j = 0; j < 3; j++) {
                const idx = i * 3 + j;
                if (idx == 0) {
                    // 固定第一行第一列给表格
                    nodes.push({grow: 10, componentMetaDataList: [{component: TableMonitorComponent, selector: 'table-monitor'}]});
                } else if (idx == this.cells - 1) {
                    // 固定最后一个框给+号
                    nodes.push({grow: 10, componentMetaDataList: [{component: NewMonitorComponent, selector: 'new-monitor'}]});
                } else if (data[idx - 1]) {
                    // 其他的全是图形
                    nodes.push({grow: 10, componentMetaDataList: [{component: GraphMonitorComponent, selector: 'graph-monitor'}]});
                }
            }
        }

        console.log('the created raw view data:');
        console.log(view);
        this.viewData = new LayoutData();
        this.viewData.direction = 'vertical';
        this.viewData.fromObject(view);
        setTimeout(() => this.feedData(), 0);
    }

    updateTableData(data: TableCellData[][]) {
        this.tableData = data;
        if (!this.viewData) {
            // 此时图形数据还没查到，不知道如何布局
            return;
        }
        this.feedData();
    }

    feedData() {
        if (!this.viewData) {
            return;
        }

        if (this.toggleFullScreen && this.toggleFullScreen.frozen) {
            const chartId = this.toggleFullScreen.chartId;
            const data = chartId == 0 ? this.tableData :
                this.graphData ? this.graphData.find(g => g.chartID == chartId) : null;
            if (!data) {
                return;
            }
            this.toggleFullScreen.component.data = data;
        } else {
            let index = 0;
            this.viewData.getComponents().forEach(compInfo => {
                const comp = compInfo.component instanceof ComponentRef ? compInfo.component.instance : null;
                if (comp == null) {
                    return;
                }
                if (comp instanceof GraphMonitorComponent && !!this.graphData[index]) {
                    const gd = this.graphData[index];
                    if (!gd) {
                        console.error('data not found! this should not happen!');
                        return;
                    }
                    comp.index = index;
                    comp.data = gd;
                    this.graphData[index] = null;
                    index++;
                } else if (comp instanceof TableMonitorComponent && !!this.tableData) {
                    comp.data = this.tableData;
                    this.tableData = null;
                }
            });
        }
    }
}
