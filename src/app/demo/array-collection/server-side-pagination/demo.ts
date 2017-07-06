import {Component} from "@angular/core";
import {PageableArray} from "jigsaw/core/data/array-collection";
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

     onAjaxSuccess(data): void {
        this.ready = true;
    }

     onAjaxError(err): void {
        this.ready = false;
        this.errorInfo = err;
    }

    start() {
        this.errorInfo = '';
        this.pageable.fromAjax();
    }

    previousPage() {
        this.pageable.previousPage();
    }

    nextPage() {
        this.pageable.nextPage();
    }
}
