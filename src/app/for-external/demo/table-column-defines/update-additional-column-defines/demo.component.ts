import {Component, ElementRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    AdditionalColumnDefine,
    AdditionalTableData,
    JigsawTable,
    TableCellCheckboxRenderer,
    TableData,
    TableHeadCheckboxRenderer
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-update-additional-column-defines',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableUpdateAdditionalColumnDefineDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/update-additional-column-defines";

    tableData: TableData;
    inputValue: string = "单选框";

    @ViewChild('table') table: JigsawTable;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    updateAdditionalColumnDefine() {
        this.additionalColumns[0].header.text = this.inputValue;
        this.table.update();
    }

    updateHeaderCheckboxValue(selectAll: number) {
        this.table.additionalData.data.forEach((row, index) => {
            row[1] = selectAll;
            if (this.table.additionalData instanceof AdditionalTableData) {
                this.table.additionalData.touchValueByRow("additional-field-1", index, selectAll);
            }
        });
        this.table.additionalData.refresh();
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            header: {
                text: '单选框'
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        },
        {
            pos: 0,
            header: {
                renderer: TableHeadCheckboxRenderer,
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        }];

}
