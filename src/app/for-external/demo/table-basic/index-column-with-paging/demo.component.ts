import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    PageableTableData, AdditionalColumnDefine, ColumnDefine, TableValueGenerators,
    SortAs, SortOrder
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-basic-index-column-with-paging',
    templateUrl: './demo.component.html'
})
export class TableBasicAddIDWithPagingComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/index-column-with-paging";

    public pageable: PageableTableData;

    public columns: ColumnDefine[] = [{
        target: 'id',
        header: {
            sortable: true,
            sortAs: SortAs.number,
            defaultSortOrder: SortOrder.asc,
        }
    }];

    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            data: TableValueGenerators.rowIndexGenerator
        }
    }];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries',
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }
}
