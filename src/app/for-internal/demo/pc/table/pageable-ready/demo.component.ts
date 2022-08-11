import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData, ColumnDefine} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TablePageableReadyDemoComponent {
    pageable: PageableTableData;
    pageableReady: PageableTableData;


    constructor(http: HttpClient) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'ready为true时，在设置pagingInfo的pageSize，或者currentPage属性，会触发查询；ready为false时，pagingInfo的pageSize，或者currentPage属性则不会触发查询';
    description: string = '';
}
