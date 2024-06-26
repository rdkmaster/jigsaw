import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { AdditionalColumnDefine, ArrayCollection, ColumnDefine, JigsawTable, TableCellCheckboxRenderer, TableData, TableHeadCheckboxRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', './../../assets/demo.common.css']
})
export class TableFreezeColumnDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.dataReviser = (result => {
            result.header[0] = '很长的姓名很长的姓名很长的姓名很长的姓名很长的姓名。。。。。';
            return result;
        });
        this.tableData.fromAjax('mock-data/hr-list');
    }

    public tableData: TableData;

    public columnDefines: ColumnDefine[] = [
        { target: 0, width: 'byContent' },
        { target: 1, width: 100 }
    ];

    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 50,
        header: { renderer: TableHeadCheckboxRenderer },
        cell: { renderer: TableCellCheckboxRenderer, }
    }];

    @ViewChild('tableCmp')
    public tableCmp: JigsawTable;

    public freezeLeftColumns = 2;
    public freezeRightColumns = 0;
    public contentWidthNum = 2000;
    public columnResizable = false;

    public valueChange() {
        setTimeout(() => {
            this.tableCmp.resize();
        }, 0);
    }

    public contentWidthData = new ArrayCollection([
        { label: "auto", id: 1 },
        { label: "_inner_auto_", id: 2 },
        { label: "固定值", id: 3 },
        { label: "不设置", id: 4 },
    ]);

    public selectedContentWidth = [{ label: "固定值", id: 3 }];

    public get contentWidth() {
        if (this.selectedContentWidth[0].id == 3) {
            return this.contentWidthNum;
        } else if (this.selectedContentWidth[0].id == 4) {
            return undefined;
        } else {
            return this.selectedContentWidth[0].label;
        }
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
