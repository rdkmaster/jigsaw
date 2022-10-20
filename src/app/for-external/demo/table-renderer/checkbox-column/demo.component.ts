import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    TableData, AdditionalColumnDefine, AdditionalTableData, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-checkbox-column',
    templateUrl: './demo.component.html'
})
export class TableAddCheckboxColumnDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-renderer/checkbox-column";

    public tableData: TableData;
    public selectedRows: string;
    public additionalData: AdditionalTableData;
    //控制表头中的checkbox是否禁用
    public headerDisabled = false;

    public additionalColumns: AdditionalColumnDefine[] = [{
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

    public additionalDataChange() {
        this.selectedRows = this.getSelectedRows(this.additionalData);
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    public getSelectedRows(additionalData) {
        return additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(index);
            }
            return selectedRows;
        }, []).join(',');
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
        this.tableData.onAjaxComplete(() => {
            setTimeout(() => {
                if (this.additionalData) console.log(this.additionalData.data);
            }, 1000)
        })
    }
}
