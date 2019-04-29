import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {AdditionalColumnDefine, AdditionalTableData} from "jigsaw/pc-components/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";

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

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo介绍table中使用内置checkbox渲染器';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawTable.additionalColumnDefines',
        'JigsawTable.additionalDataChange',
        'AdditionalColumnDefine',
        'AdditionalTableData',
        'TableHeadCheckboxRenderer',
        'TableCellCheckboxRenderer',
    ];
}

