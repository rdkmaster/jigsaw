import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData, ColumnDefine} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'pageable-ready-table',
    templateUrl: './demo.component.html'
})
export class TablePageableReadyDemoComponent {
    pageable: PageableTableData;
    pageableReady: PageableTableData;


    constructor(http: HttpClient, public text: TableTextService) {
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
