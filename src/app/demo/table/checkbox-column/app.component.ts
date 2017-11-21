import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, AdditionalTableData, ColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableCellRendererBase, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TableAddCheckboxColumnDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.tableData2 = new TableData();
        this.tableData2.http = http;
        // 对ajax返回过来的数据进行预处理
        this.tableData2.dataReviser = this.addToString;
        this.tableData2.fromAjax('mock-data/hr-list-with-object-cell-data');
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    }];

    // demo1
    tableData: TableData;
    selectedRows: string;
    additionalData: AdditionalTableData;

    additionalDataChange(value) {
        console.log(value);
        this.selectedRows = this.getSelectedRows(this.additionalData);
    }

    // demo2
    tableData2: TableData;
    selectedRows2: string;
    additionalData2: AdditionalTableData;

    columnDefineGenerator2(field, index): ColumnDefine {
        return {
            cell: {
                renderer: TableCellObjectRenderer
            }
        }
    }

    additionalDataChange2(value) {
        console.log(value);
        this.selectedRows2 = this.getSelectedRows(this.additionalData2);
    }

    /**
     * 在Json Object对象中添加toString方法
     * @param data
     * @returns {any}
     */
    addToString(data) {
        if (data && data.data instanceof Array) {
            data.data.forEach(item => {
                item.forEach((value, j) => {
                    item[j].toString = () => {
                        return JSON.stringify(item);
                    }
                });
            });
        }
        return data;
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    getSelectedRows(additionalData) {
        return additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(index);
            }
            return selectedRows;
        }, []).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo介绍table中使用内置checkbox渲染器';
    description: string = require('!!raw-loader!./readme.md');
}

@Component({
    template: `{{cellDataValue}}`
})
export class TableCellObjectRenderer extends TableCellRendererBase implements OnInit {
    cellDataValue: string;

    ngOnInit() {
        if (this.cellData instanceof Object && Object.keys(this.cellData)) {
            this.cellDataValue = this.cellData[Object.keys(this.cellData)[0]]
        }
    }
}

