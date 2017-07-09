import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-api";
import {JigsawPagination} from "jigsaw/component/pagination/pagination";
import {TableCellNum} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: 'addIDWithDebouncePaging.html'
})
export class TableAddIDWithDebouncePagingComponent implements AfterViewInit{
    pageable: PageableTableData;

    @ViewChild('paging') paging: JigsawPagination;

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
            renderer: TableCellNum
        }
    }]
}

