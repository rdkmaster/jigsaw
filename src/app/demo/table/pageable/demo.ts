import {Component} from "@angular/core";
import {PageableTableData, TableData} from "../../../../rdk/core/data/table-data";
import {Http} from "@angular/http";
import {PageableArray} from "../../../../rdk/core/data/array-collection";

@Component({
  templateUrl: 'demo.html'
})
export class TablePageableDemoComponent {
    pageable:PageableTableData;
    constructor(http:Http) {
        this.pageable = new PageableTableData(http, {
            url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
            params: {aa: 11, bb: 22}, method:'get'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    getCurrentPage(){
        this.pageable.changePage(this.pageable.pagingInfo);
    }
    getPageSize(){
        this.pageable.changePage(this.pageable.pagingInfo);
    }
}

