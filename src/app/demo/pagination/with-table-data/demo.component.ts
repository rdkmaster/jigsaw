import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {HttpClientOptions} from "jigsaw/core/data/component-data";

@Component({
    templateUrl: './demo.component.html'
})
export class ServerSidePagingDemoComponent {
    public pageable: PageableTableData;

    constructor(http: HttpClient) {
        const arg: HttpClientOptions = {
            url: 'mock-data/countries',
            method: 'get', params: {aa: 11, bb: 22}
        };
        this.pageable = new PageableTableData(http, arg);
        this.pageable.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawPagination',
        'PageableTableData'
    ];
}

