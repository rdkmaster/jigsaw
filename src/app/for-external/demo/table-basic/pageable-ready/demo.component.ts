import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageableTableData, ColumnDefine } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-basic-pageable-ready',
    templateUrl: './demo.component.html'
})
export class TableBasicPageableReadyDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/pageable-ready";

    public pageable: PageableTableData;
    public pageableReady: PageableTableData;
    public columnDefines: ColumnDefine[] = [
        {
            target: 0,
            header: {
                sortable: true
            }
        }
    ];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', method: 'post'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;

        this.pageableReady = new PageableTableData(http, {
            url: 'mock-data/countries', method: 'post'
        });

        this.pageableReady.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageableReady.ready = false;
        this.pageableReady.pagingInfo.pageSize = 5;
    }
}
