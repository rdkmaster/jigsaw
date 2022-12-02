import { Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    AdditionalColumnDefine,
    AdditionalTableData,
    TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer,
    TableData,
    ColumnDefine,
    TableValueGenerators, TableCellTextEditorRenderer
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class TableCheckBoxInputDemoComponent {
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
    checkField: string[];

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 30,
        header: {
            renderer: TableHeadCheckboxRenderer,
            rendererInitData: (td, row, col) => {
                return {
                    disabled: false
                }
            }
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row, col) => this.checkField?.includes(td.data[row][0]),
        }
    }];

    columnDefines: ColumnDefine[] = [
        {
        target: 'desc',
        cell: {
            tooltip: TableValueGenerators.originCellDataGenerator,
            editorRenderer: TableCellTextEditorRenderer,
            editorRendererInitData: {
                valid: (td, row, col) => {
                    return !(!td.data[row][col] && this.checkField?.includes(td.data[row][0]));
                },
                clearable: false,
            },
            editable: true,
            alwaysShowEditor: true,
        },
        },
        {
            target: 'gender', visible: false
        }
    ];

    additionalDataChange() {
        this.selectedRows = this.getSelectedRows(this.additionalData);
        this.onCellChange()
    }


    public onCellChange() {
        this.checkField = this.additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(this.tableData.data[index][0]);
            }
            return selectedRows;
        }, []);
        console.log(this.checkField)
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
    description: string = "";
}
