import {
    AfterViewInit, Component, ViewChild, Renderer2, ViewContainerRef
} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine, TableValueGenerators} from "jigsaw/component/table/table-typings";
import {JigsawPagination} from "jigsaw/component/pagination/pagination";

@Component({
    templateUrl: './app.component.html'
})
export class TableAddIDWithDebouncePagingComponent implements AfterViewInit{
    pageable: PageableTableData;

    @ViewChild('paging') paging: JigsawPagination;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
            params: {aa: 11, bb: 22}
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    ngAfterViewInit(){
        this.paging.currentChange.debounceTime(300).subscribe(() => {
            console.log('pageable now query from ajax!');
            this.pageable.fromAjax();
        })
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
            data: TableValueGenerators.rowIndexGenerator
        }
    }]
}

