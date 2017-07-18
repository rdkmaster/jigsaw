import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {TableCellNum} from "jigsaw/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-api";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";

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
        header: {
            sortable: true,
            sortAs: SortAs.number,
            defaultSortOrder: SortOrder.asc,
        }
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

