import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableCellRendererBase, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './app.component.html'
})
export class TableAddCheckboxColumnDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.tableData2 = new TableData();
        this.tableData2.http = http;
        this.tableData2.fromAjax('mock-data/hr-list');
        this.tableData2.onAjaxSuccess(data => {
            data.data.forEach((item, i) => {
                item.forEach((value, j) => {
                    let key;
                    switch (j) {
                        case 0:
                            key = 'name';
                            break;
                        case 1:
                            key = 'gender';
                            break;
                        case 2:
                            key = 'position';
                            break;
                        case 3:
                            key = 'salary';
                            break;
                        case 4:
                            key = 'enroll-date';
                            break;
                        case 5:
                            key = 'office';
                            break;
                        case 6:
                            key = 'desc';
                            break;
                    }
                    item[j] = {};
                    item[j][key] = value;
                    item[j].toString = function () {
                        return `${key}: ${value}`
                    }
                })
            });
            console.log(data);
        })
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
    changeMsg: string;
    selectedRows: string;
    additionalData;

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }

        console.log(this.additionalData.getTouchedValues(0));

        this.selectedRows = "";
    }

    // demo2
    tableData2: TableData;
    changeMsg2: string;
    selectedRows2: string;
    additionalData2;

    columnDefineGenerator2(field, index): ColumnDefine {
        return {
            cell: {
                renderer: TableCellObjectRenderer
            }
        }
    }

    onCellChange2(value) {
        this.changeMsg2 = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData2.data[row][value.column]);
        }

        console.log(this.additionalData2.getTouchedValues(0));

        this.selectedRows2 = "";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
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

