import {Component} from "@angular/core";
import {ArrayCollection, PageableArray} from "../../../../../core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'demo.html', styles: ['.alert {color: red;}']
})
export class ServerSidePaginationDemoComponent {
    pageable: PageableArray;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: Http) {
        this.pageable = new PageableArray(http,
            {url: 'http://localhost:4200/mock-data/array-collection/paging-data.json', params: {aa: 11, bb: 22}});
        this.pageable.onAjaxSuccess(this.onAjaxSuccess, this);
        this.pageable.onAjaxError(this.onAjaxError, this);
    }

    private onAjaxSuccess(data): void {
        this.ready = true;
    }

    private onAjaxError(err): void {
        this.ready = false;
        this.errorInfo = err;
    }

    start() {
        this.errorInfo = '';
        this.pageable.fromAjax();
    }

    lastPage() {
        if (this.pageable.pagingInfo.currentPage == 1) {
            return;
        }
        this.pageable.changePage(this.pageable.pagingInfo.currentPage - 1);
    }

    nextPage() {
        if (this.pageable.pagingInfo.currentPage == this.pageable.pagingInfo.totalPage) {
            return;
        }
        this.pageable.changePage(this.pageable.pagingInfo.currentPage + 1);
    }
}
