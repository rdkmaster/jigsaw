import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAutoPageableDemoComponent {
    pageable: PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.autoPaging = true;
        this.pageable.pagingInfo.itemSize = 30;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
