import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageableArray} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html', styles: ['.alert {color: red;}']
})
export class ServerSidePaginationDemoComponent {
    pageable: PageableArray;
    ready = false;
    errorInfo = "";
    tipClass = {'alert': !!this.errorInfo};

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.pageable = new PageableArray(http,
            {
                url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
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
}
