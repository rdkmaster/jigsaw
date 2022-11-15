import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ColumnDefine, DirectPageableTableData, LocalPageableTableData, PageableTableData} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class TableSetHeaderFilterDemoComponent {
    public localPageableSearchValue: string;
    public localPageable: LocalPageableTableData;
    public localPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
        {
            target: "salary",
            header: {
                filterable: true,
                sortable: true
            },
        },
    ];

    public onLocalPageableSearch(key: string) {
        this.localPageableSearchValue = key;
        this.localPageable.filter(key, null)
    }

    public onLocalPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public changeLocalPageable() {
        if (this.localPageable.pagingInfo.totalRecord < 10) {
            this.localPageable.fromAjax("mock-data/hr-list");
        } else {
            this.localPageable.fromAjax("mock-data/hr-list-short");
        }
        this.localPageable.onRefresh(() => {
            this.localPageable.filter(this.localPageableSearchValue || '', null);
        })
    }

    public pageablePageableSearchValue: string;
    public pageable: PageableTableData;
    public pageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onPageableSearch(key: string) {
        this.pageablePageableSearchValue = key;
        this.pageable.filter(key, null);
    }

    public onPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public directPageableSearchValue: string;
    public directPageable: DirectPageableTableData;
    public directPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onDirectPageableSearch(key: string) {
        this.directPageableSearchValue = key;
        this.directPageable.filter(key, null);
    }

    public onDirectPageableHeaderFilterChange($event) {
        console.log($event);
    }

    constructor(http: HttpClient) {
        this.localPageable = new LocalPageableTableData();
        this.localPageable.http = http;
        this.localPageable.pagingInfo.pageSize = 10;
        this.localPageable.fromAjax("mock-data/hr-list");

        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;

        this.directPageable = new DirectPageableTableData(http, {
            url: '/direct/pageable/table-data/simulation', method: 'post'
        });
        this.directPageable.onAjaxComplete(() => {
            console.log(this.directPageable);
        });
        this.directPageable.pagingInfo.pageSize = 5;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
