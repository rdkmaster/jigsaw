import {Component, ViewEncapsulation} from "@angular/core";
import {PageableTableData} from "../../../../rdk/core/data/table-data";
import {Http} from "@angular/http";
import {TableCellNum} from "../../../../rdk/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine} from "../../../../rdk/component/table/table-api";

@Component({
    templateUrl: 'addIDWithPaging.html'
})
export class TableAddIDWithPagingComponent {
    pageable: PageableTableData;

    constructor(http: Http) {
        this.pageable = new PageableTableData(http, {
            url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
            params: {aa: 11, bb: 22}, method: 'get'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    getCurrentPage() {
        this.pageable.fromAjax();
    }

    getPageSize() {
        this.pageable.fromAjax();
    }

     _columns: ColumnDefine[] = [{
        target: 'id',
        visible: false
    }];

     _additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            renderer: TableCellNum
        }
    }]
}

