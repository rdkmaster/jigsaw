import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    PageableTableData, AdditionalColumnDefine, ColumnDefine, TableValueGenerators,
    SortAs, SortOrder
} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-index-column-with-paging',
    templateUrl: './demo.component.html'
})
export class TableBasicAddIDWithPagingComponent {
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

    constructor(http: HttpClient, public text: TableBasicTextService) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries',
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }
}
