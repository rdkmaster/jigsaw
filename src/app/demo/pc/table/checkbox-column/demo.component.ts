import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    TableData, AdditionalColumnDefine, AdditionalTableData, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAddCheckboxColumnDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
        this.tableData.onAjaxComplete(() => {
            setTimeout(() => {
                if(this.additionalData) console.log(this.additionalData.data);
            }, 1000)
        })
    }

    tableData: TableData;
    selectedRows: string;
    additionalData: AdditionalTableData;
    headerDisabled = true;

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 20,
        header: {
            renderer: TableHeadCheckboxRenderer,
            rendererInitData: (td, row, col) => {
                console.log(row, col);
                return {
                    disabled: this.headerDisabled
                }
            }
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row, col) => {
                return td.data[row][2] == 'Developer'
            },
            rendererInitData: (td, row, col) => {
                return {
                    disabled: row > 3,
                    // 偶数行无效
                    valid: row % 2
                }
            }
        }
    }];

    additionalDataChange(value) {
        console.log(value);
        this.selectedRows = this.getSelectedRows(this.additionalData);
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

    changeData() {
        this.tableData.fromAjax('mock-data/hr-list-short');
        // 重置additionalData
        this.additionalData.reset();
        this.selectedRows = '';
    }

    toggleHeaderDisabled() {
        // copy origin table data
        this.tableData.fromObject({
            data: [...this.tableData.data], header: [...this.tableData.header], field: [...this.tableData.field]
        });
        this.headerDisabled = !this.headerDisabled;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo介绍table中使用内置checkbox渲染器';
    description: string = require('!!raw-loader!./readme.md').default;
}
