import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, ColumnDefine } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
})
export class TableSetHeaderFilterDemoComponent {
    public localPageable: LocalPageableTableData;

    public localPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];
    constructor(http: HttpClient) {
        this.localPageable = new LocalPageableTableData();
        this.localPageable.http = http;
        this.localPageable.pagingInfo.pageSize = 10;
        this.localPageable.fromAjax("mock-data/hr-list");
    }

    public onHeaderFilterChange($event) {
        console.log($event);
    }

    public changeLocalPageable() {
        this.localPageable.fromAjax("mock-data/hr-list-short");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
