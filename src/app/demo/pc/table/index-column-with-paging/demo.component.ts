import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    PageableTableData, AdditionalColumnDefine, ColumnDefine, TableValueGenerators,
    SortAs, SortOrder
} from "jigsaw/public_api";

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
