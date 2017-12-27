import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {JigsawTable} from "../../../../jigsaw/component/table/table";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TableScrollListenDemoComponent implements AfterViewInit{
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
    _removeHorizontalScrollListener;

    ngAfterViewInit(){
        this._removeHorizontalScrollListener = this._renderer.listen(
            this.table.contentScrollbar.elementRef.nativeElement, 'ps-scroll-x', () => {
                this._renderer.setStyle(this.content.nativeElement, 'left',
                    -this.table.contentScrollbar.geometry().x + 'px');
            });

    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



