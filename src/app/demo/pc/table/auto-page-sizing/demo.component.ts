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
    hideHeader: boolean = false;

    constructor(http: HttpClient, public cdr: ChangeDetectorRef) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.autoPageSizing = true;
        this.pageable.pagingInfo.itemHeight = 32;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo展示了根据容器高度来自动设置分页页数的功能，目前仅支持表格所有记录都等高的情况。';
    description: string = '提示：在表格的`columnDefines`属性里添加一个cell.tooltip属性可以让对应的列保持不换行，' +
        '避免表格中某些行文本过多导致的意外换行，从而造成自动计算的当前也条数错误的问题，参考[这个demo](#/pc/table/renderer)的源码。';
}
