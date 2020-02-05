import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {JigsawTable} from "jigsaw/component/table/table";
import {CallbackRemoval} from "jigsaw/core/utils/common-utils";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableScrollListenDemoComponent implements AfterViewInit, OnDestroy {
    tableData: TableData;

    constructor(http: HttpClient, private _renderer: Renderer2) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/big-table-data');
        this.tableData.dataReviser = data => {
            data.data = data.data.slice(0, 10);
            return data;
        }
    }

    arr = new Array(200);

    @ViewChild(JigsawTable) table: JigsawTable;
    @ViewChild('content') content: ElementRef;
    private _removeHorizontalScrollListener: CallbackRemoval;

    ngAfterViewInit() {
        this._removeHorizontalScrollListener = this._renderer.listen(
            this.table.contentScrollbar.elementRef.nativeElement, 'ps-scroll-x', () => {
                this._renderer.setStyle(this.content.nativeElement, 'left',
                    -this.table.contentScrollbar.geometry().x + 'px');
            });

    }

    ngOnDestroy() {
        if (this._removeHorizontalScrollListener) {
            this._removeHorizontalScrollListener()
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



