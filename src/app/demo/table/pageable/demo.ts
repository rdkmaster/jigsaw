import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {PageableTableData} from "jigsaw/core/data/table-data";

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

