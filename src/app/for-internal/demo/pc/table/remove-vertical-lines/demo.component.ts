import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class RemoveVerticalLinesDemoComponent {

    public pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
