import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, JigsawTable } from "jigsaw/public_api";
import {TableActionsTextService} from "../doc.service";

@Component({
    selector: 'table-auto-page-sizing',
    templateUrl: './demo.component.html'
})
export class TableAutoPageableDemoComponent {
    @ViewChild('tableCmp')
    tableCmp: JigsawTable;
    pageable: LocalPageableTableData;
    hideHeader: boolean = false;

    constructor(http: HttpClient, public cdr: ChangeDetectorRef, public doc: TableActionsTextService) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.autoPageSizing = true;
    }
}
