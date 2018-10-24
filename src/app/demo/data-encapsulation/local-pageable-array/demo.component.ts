import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableArray} from "jigsaw/core/data/array-collection";
import {TableData} from "jigsaw/core/data/table-data";
import {SortAs, SortOrder} from "../../../../jigsaw/core/data/component-data";

@Component({
    templateUrl: './demo.component.html', styles: ['.alert {color: red;}']
})
export class LocalPageableArrayDemoComponent {
    pageable: LocalPageableArray<any>;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableArray();
        this.pageable.http = http;
        this.pageable.dataReviser = (td: TableData) => TableData.toArray(td);
        this.pageable.onAjaxSuccess(this.onAjaxSuccess, this);
        this.pageable.onAjaxError(this.onAjaxError, this);
        this.pageable.pagingInfo.pageSize = 20;
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        })
    }

    onAjaxSuccess(data): void {
        this.ready = true;
    }

    onAjaxError(err): void {
        this.ready = false;
        this.errorInfo = err;
    }

    start() {
        this.errorInfo = '';
        this.pageable.fromAjax('mock-data/countries');
    }

    previousPage() {
        this.pageable.previousPage();
    }

    nextPage() {
        this.pageable.nextPage();
    }

    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        this.pageable.filter(filterKey, ['enName', 'zhName']);
    }

    toggleSortOrder: SortOrder;
    sort() {
        this.toggleSortOrder = this.toggleSortOrder == SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        this.pageable.sort(SortAs.string, this.toggleSortOrder, 'enName');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}
