import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine, TableValueGenerators} from "jigsaw/component/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAddIDWithPagingComponent {
    pageable: PageableTableData;

    columns: ColumnDefine[] = [{
        target: 'id',
        header: {
            sortable: true,
            sortAs: SortAs.number,
            defaultSortOrder: SortOrder.asc,
        }
    }];

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            data: TableValueGenerators.rowIndexGenerator
        }
    }];

    constructor(http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries',
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    getCurrentPage() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.fromAjax();
    }

    getPageSize() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
