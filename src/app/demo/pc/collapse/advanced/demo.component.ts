import { Component } from "@angular/core";
import {CollapseTextService} from "../doc.service";
import {TableData} from "../../../../../jigsaw/common/core/data/table-data";
import {LineGraphData, PieGraphData} from "../../../../../jigsaw/common/core/data/graph-data";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: "collapse-advanced",
    templateUrl: "./demo.component.html",
})
export class CollapseAdvancedDemoComponent {
    tableData: TableData;
    public pieGraphDataByCol: PieGraphData;
    // @ts-ignore
    public lineGraphData: LineGraphData;

    constructor(public text: CollapseTextService, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.pieGraphDataByCol = new PieGraphData();
        this.pieGraphDataByCol.http = http;
        this.pieGraphDataByCol.fromAjax('mock-data/marketing');

        this.lineGraphData = new LineGraphData();
        this.lineGraphData.http = http;
        this.lineGraphData.fromAjax('mock-data/marketing');
    }

}