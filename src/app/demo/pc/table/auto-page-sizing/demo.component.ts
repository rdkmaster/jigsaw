import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, JigsawTable } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAutoPageableDemoComponent {
    @ViewChild('tableCmp')
    tableCmp: JigsawTable;
    pageable: LocalPageableTableData;

    constructor(http: HttpClient, private _cdr: ChangeDetectorRef) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.autoPageSizing = true;
        this.pageable.pagingInfo.itemSize = 30;
    }

    switchAutoPage() {
        this.pageable.pagingInfo.autoPageSizing = !this.pageable.pagingInfo.autoPageSizing;
        this._cdr.markForCheck();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo展示了table可以根据浏览器或容器的高度来自动设置分页页数，以最大化利用页面空间。';
    description: string = '';
}
