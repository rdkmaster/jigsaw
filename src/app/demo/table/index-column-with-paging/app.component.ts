import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './app.component.html'
})
export class TableAddIDWithPagingComponent {
    pageable: PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries',
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    getCurrentPage() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.fromAjax();
    }

    getPageSize() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}
