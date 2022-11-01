import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, LineGraphData, PieGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "collapse-title-and-content",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class CollapseTitleAndContentDemoComponent extends AsyncDescription {
    public demoPath = "demo/collapse/title-and-content";

    public tableData: TableData;
    public pieGraphDataByCol: PieGraphData;
    public lineGraphData: LineGraphData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
