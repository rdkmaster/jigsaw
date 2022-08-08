import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    TableData, AdditionalColumnDefine, AdditionalTableData, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer
} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'checkbox-column-table',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableAddCheckboxColumnDemoComponent {
    constructor(http: HttpClient, public text: TableTextService) {
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
        pos: 1,
        width: 30,
        header: {
            renderer: TableHeadCheckboxRenderer,
            rendererInitData: (td, row, col) => {
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

    additionalDataChange() {
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
}
