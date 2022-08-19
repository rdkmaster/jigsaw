import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, JigsawTable} from "jigsaw/public_api";
import {TableActionsTextService} from "../doc.service";

@Component({
    selector: 'table-resize',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableResizeDemoComponent implements OnInit {
    tableData: TableData;

    constructor(http: HttpClient, public elementRef: ElementRef, public doc: TableActionsTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    tableWidth: any = '100%';

    @ViewChild('tableCmp') tableCmp: JigsawTable;

    changeTableWidth() {
        // 修改table的width，table会自动resize
        // window resize时，table也会自动resize
        this.tableWidth = this.tableWidth == '50%' ? '100%' : '50%';
    }

    changeBoxWidth() {
        this.box.style.width = this.box.style.width == '50%' ? '100%' : '50%';
        // 父元素的宽度变化（非window resize引起的），需要用户手动调一下table的resize
        this.tableCmp.resize();
    }

    box: HTMLElement;

    ngOnInit() {
        this.box = this.elementRef.nativeElement.querySelector('.box');
    }
}
