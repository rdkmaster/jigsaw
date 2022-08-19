import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData, ColumnDefine} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-pageable-ready',
    templateUrl: './demo.component.html'
})
export class TableBasicPageableReadyDemoComponent {
    pageable: PageableTableData;
    pageableReady: PageableTableData;


    constructor(http: HttpClient, public doc: TableBasicTextService) {
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

    columnDefines: ColumnDefine[] = [
        {
            target: 0,
            header: {
                sortable: true
            }
        }
    ];
}
