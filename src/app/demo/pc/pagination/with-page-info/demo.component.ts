import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, PageableTableData, PagingInfo, ArrayCollection} from "jigsaw/public_api";
import {PaginationTextService} from "../text.service";

@Component({
    selector: 'with-page-info-pagination',
    templateUrl: './demo.component.html'
})
export class WithPagingInfoDemoComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    actions = 0;
    pageable: LocalPageableTableData;

    constructor(http: HttpClient, public text: PaginationTextService) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');

        this.pageable.pagingInfo.totalRecord = 200;
        this.pageable.pagingInfo.subscribe(() => {
            this.actions++;
        })
    }
}
