import { Component } from "@angular/core";
import {PageableTableData} from "../../../../../core/data/table-data";
import {Http, RequestOptionsArgs} from "@angular/http";

@Component({
  templateUrl: 'demo.html'
})
export class ServerSidePagingDemoComponent {
    public pageable:PageableTableData;

    constructor(http:Http) {
        const arg:RequestOptionsArgs = {
            url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
            params: {aa: 11, bb: 22}
        };
        this.pageable = new PageableTableData(http, arg);
        this.pageable.fromAjax();
    }
}

