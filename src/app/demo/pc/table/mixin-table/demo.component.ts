import {Component, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellRendererBase} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableMixinTableDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    offices: any[];
    columns: ColumnDefine[] = [
        {
            target: 'salary',
            width: '500',
            cell: {
                renderer: MixinTable
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

@Component({
    template: `
        <j-table #table [data]="tableData1" [hideHeader]="true" (selectedRowChange)="table.selectedRow=-1"></j-table>
    `
})
export class MixinTable extends TableCellRendererBase {
    tableData1: TableData;

    constructor(protected _injector: Injector) {
        super(_injector);
        this.tableData1 = new TableData(
            [
                [
                    "$320,00",
                    "$300,00",
                    "$20,00",
                    "542"
                ],
                [
                    "$170,7",
                    "$150,7",
                    "$707",
                    "8,422"
                ],
                [
                    "$420,00",
                    "$400,00",
                    "$60,00",
                    "1,542"
                ],
            ],
            ["before-tax", "after-tax", "bonus", "extn"],
            ["税前", "税后", "奖金", "其他"]);
    }
}
