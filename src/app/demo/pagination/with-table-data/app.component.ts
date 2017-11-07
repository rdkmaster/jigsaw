import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {HttpClientOptions} from "jigsaw/core/data/component-data";

@Component({
    templateUrl: './app.component.html'
})
export class ServerSidePagingDemoComponent {
    public pageable: PageableTableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        const arg: HttpClientOptions = {
            url: 'mock-data/countries',
            method: 'get', params: {aa: 11, bb: 22}
        };
        this.pageable = new PageableTableData(http, arg);
        this.pageable.fromAjax();
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }
}

