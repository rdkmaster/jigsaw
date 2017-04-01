import {Component} from "@angular/core";
import {ArrayCollection, ServerSidePagingArray} from "../../../../../core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'demo.html', styles: ['.alert {color: red;}']
})
export class ServerSidePaginationDemoComponent {
    sspa: ServerSidePagingArray;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: Http) {
        this.sspa = new ServerSidePagingArray(http,
            {url: 'http://localhost:4200/mock-data/array-collection/paging-data.json', params: {aa: 11, bb: 22}});
        this.sspa.onAjaxSuccess(this.onAjaxSuccess, this);
        this.sspa.onAjaxError(this.onAjaxError, this);
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
        this.sspa.fromAjax();
    }

    lastPage() {
        if (this.sspa.pagingInfo.currentPage == 1) {
            return;
        }
        this.sspa.pagingInfo.currentPage--;
        this.sspa.fromAjax();
    }

    nextPage() {
        if (this.sspa.pagingInfo.currentPage == this.sspa.pagingInfo.totalPage) {
            return;
        }
        this.sspa.pagingInfo.currentPage++;
        this.sspa.fromAjax();
    }
}
