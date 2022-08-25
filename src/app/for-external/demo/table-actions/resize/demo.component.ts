import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, JigsawTable } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-resize',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableResizeDemoComponent extends AsyncDescription implements OnInit {
    public demoPath = "demo/table-actions/resize";

    @ViewChild('tableCmp') tableCmp: JigsawTable;
    public tableData: TableData;
    public tableWidth: any = '100%';

    public changeTableWidth() {
        // 修改table的width，table会自动resize
        // window resize时，table也会自动resize
        this.tableWidth = this.tableWidth == '50%' ? '100%' : '50%';
    }

    public changeBoxWidth() {
        this.box.style.width = this.box.style.width == '50%' ? '100%' : '50%';
        // 父元素的宽度变化（非window resize引起的），需要用户手动调一下table的resize
        this.tableCmp.resize();
    }

    public box: HTMLElement;

    ngOnInit() {
        this.box = this.elementRef.nativeElement.querySelector('.box');
    }

    constructor(http: HttpClient, public elementRef: ElementRef) {
        super(http, elementRef);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
