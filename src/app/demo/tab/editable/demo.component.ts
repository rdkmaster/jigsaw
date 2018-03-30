import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {LineBarGraphData} from "jigsaw/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsEditableDemoComponent {
    editable: boolean;
    tableData: TableData;
    lineBarGraphData: LineBarGraphData;

    constructor(http: HttpClient) {
        this.lineBarGraphData = new LineBarGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要展示可编辑的tab';
    description: string = '';
    tags: string[] = [
        'JigsawTab.editable',
    ];
}
