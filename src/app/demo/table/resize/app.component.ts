import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {JigsawTable} from "../../../../jigsaw/component/table/table";

@Component({
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableResizeDemoComponent implements OnInit {
    tableData: TableData;

    constructor(http: HttpClient, public elementRef: ElementRef) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    tableWidth: any = '100%';

    @ViewChild('tableCmp') tableCmp: JigsawTable;

    changeTableWidth() {
        this.tableWidth = this.tableWidth == '50%' ? '100%' : '50%';
        setTimeout(() => {
            this.tableCmp.resize();
        });
    }

    changeBoxWidth() {
        this.box.style.width = this.box.style.width == '50%' ? '100%' : '50%';
        this.tableCmp.resize();
    }

    box: HTMLElement;

    ngOnInit() {
        this.box = this.elementRef.nativeElement.querySelector('.box');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



