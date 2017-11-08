import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableArray} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html', styles: ['.alert {color: red;}']
})
export class ServerSidePaginationDemoComponent {
    pageable: PageableArray;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(http: HttpClient) {
        this.pageable = new PageableArray(http,
            {
                url: 'mock-data/countries',
                params: {aa: 11, bb: 22}
            });
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
