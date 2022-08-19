import { Component } from "@angular/core";
import { CollapseTextService } from "../doc.service";
import { TableData, LineGraphData, PieGraphData } from "jigsaw/public_api";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "collapse-title-and-content",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class CollapseTitleAndContentDemoComponent {
    tableData: TableData;
    public pieGraphDataByCol: PieGraphData;
    // @ts-ignore
    public lineGraphData: LineGraphData;

    constructor(public doc: CollapseTextService, http: HttpClient) {
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
