import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {Http} from "@angular/http";
import {TableCellNum} from "jigsaw/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-api";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './app.component.html'
})
export class TableAddIDWithPagingComponent {
    pageable: LocalPageableTableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/array-collection/paging-data.json');

        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
    }

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
            renderer: TableCellNum
        }
    }]
}

