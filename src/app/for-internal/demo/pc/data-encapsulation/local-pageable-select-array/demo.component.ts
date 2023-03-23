import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableSelectArray, TableData, SortAs, SortOrder} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html', styles: ['.alert {color: red;}']
})
export class LocalPageableSelectArrayDemoComponent {
    lpsa: LocalPageableSelectArray<any>;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: HttpClient) {
        let array = [];
        for (let i = 1; i < 100; i++) {
            array.push({ label: '测试选项' + i })
        }
        this.lpsa = new LocalPageableSelectArray();
        this.lpsa.fromArray(array);
        console.log(this.lpsa);
        // this.lpsa.onAjaxSuccess(this.onAjaxSuccess, this);
        // this.lpsa.onAjaxError(this.onAjaxError, this);
        this.lpsa.pagingInfo.pageSize = 5;
        this.lpsa.onAjaxComplete(() => {
            console.log(this.lpsa);
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
        this.lpsa.fromAjax('mock-data/countries');
    }

    previousPage() {
        this.lpsa.previousPage();
    }

    nextPage() {
        this.lpsa.nextPage();
    }

    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        this.lpsa.filter(filterKey, ['enName', 'zhName']);
    }

    toggleSortOrder: SortOrder;
    sort() {
        this.toggleSortOrder = this.toggleSortOrder == SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        this.lpsa.sort(SortAs.string, this.toggleSortOrder, 'enName');
    }

    handleScroll($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
