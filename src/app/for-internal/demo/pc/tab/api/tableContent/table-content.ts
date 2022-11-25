import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: 'table-content.html'
})
export class TableContentComponent {
    public pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');
    }
}