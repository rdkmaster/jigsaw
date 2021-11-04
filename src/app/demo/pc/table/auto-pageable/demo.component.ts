import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, JigsawTable } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAutoPageableDemoComponent {
    @ViewChild('tableCmp') tableCmp: JigsawTable;
    pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.autoPaging = true;
        this.pageable.pagingInfo.itemSize = 30;
    }

    clickTest(){
        this.pageable.pagingInfo.containerSize = 40;
    }

    resizeTest(){
        this.tableCmp.resize();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
