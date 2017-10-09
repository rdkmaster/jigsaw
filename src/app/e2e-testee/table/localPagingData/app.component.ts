import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './app.component.html'
})
export class LocalPagingDataDemoComponent {

    pageable: LocalPageableTableData;
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/table/data.json');
    }

    getCurrentPage() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    getPageSize() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable:true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.asc,
            }
        },{
            target: 'name',
            header: {
                sortable:true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.des,
            }
        }];
}

