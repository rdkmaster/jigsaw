import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LocalPageableTableData, ColumnDefine, SortAs, SortOrder, TableCellTextEditorRenderer } from "jigsaw/public_api";
import { TableBasicTextService } from "../doc.service";

@Component({
    selector: 'table-basic-local-paging-data',
    templateUrl: './demo.component.html'
})
export class LocalPagingDataDemoComponent {
    public pageable: LocalPageableTableData;

    public columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.asc,
            }
        }, {
            target: 'name',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.desc,
            }
        }, {
            target: 'office',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer
            }
        }, {
            target: 'enroll-date',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer
            }
        }
    ];

    public _$search($event: string) {
        this.pageable.filter($event);
    }

    constructor(http: HttpClient, public doc: TableBasicTextService) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');
    }
}
