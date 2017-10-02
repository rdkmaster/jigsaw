import {Component, Injectable, Renderer2, ViewContainerRef} from "@angular/core";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('dddddddddddddd');
        return next.handle(req);
    }
}

@Component({
  templateUrl: './app.component.html'
})
export class LocalPagingDataDemoComponent {

    pageable: LocalPageableTableData;
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/table/data.json');


        http.get('mock-data/table/data.json').subscribe(data => {
            console.log(data);
        })
    }

    getCurrentPage() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    getPageSize() {
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable:true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.asc,
            }
        },{
            target: 'name',
            header: {
                sortable:true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.des,
            }
        }];
}

