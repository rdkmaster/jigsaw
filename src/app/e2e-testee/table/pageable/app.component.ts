import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";

@Component({
  templateUrl: './app.component.html'
})
export class TablePageableDemoComponent {
    pageable:PageableTableData;
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http:HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'http://localhost:4200/mock-data/countries',
            params: {aa: 11, bb: 22}
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    getCurrentPage(){
        this.pageable.changePage(this.pageable.pagingInfo);
    }
    getPageSize(){
        this.pageable.changePage(this.pageable.pagingInfo);
    }
}

