import {Component, ViewChild, ChangeDetectorRef, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, JigsawTable } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-auto-page-sizing',
    templateUrl: './demo.component.html'
})
export class TableAutoPageableDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/auto-page-sizing";

    @ViewChild('tableCmp')
    tableCmp: JigsawTable;
    pageable: LocalPageableTableData;
    hideHeader: boolean = false;

    constructor(public cdr: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.autoPageSizing = true;
    }
}
