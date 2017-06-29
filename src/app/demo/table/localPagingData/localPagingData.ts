import {Component} from "@angular/core";
import {LocalPageableTableData} from "../../../../rdk/core/data/table-data";
import {Http} from "@angular/http";
import {ColumnDefine} from "../../../../rdk/component/table/table-api";
import {SortAs, SortOrder} from "../../../../rdk/core/data/component-data";



@Component({
  templateUrl: 'localPagingData.html'
})

export class LocalPagingDataDemoComponent {

    pageable: LocalPageableTableData;
    constructor(http: Http) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/table/data.json');
    }

    getCurrentPage() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    getPageSize() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    private _columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable:true,
                sortAs: SortAs.number,
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

