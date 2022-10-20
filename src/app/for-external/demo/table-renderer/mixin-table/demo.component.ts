import {Component, ElementRef, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellRendererBase} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-mixin-table',
    templateUrl: './demo.component.html'
})
export class TableMixinTableDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-renderer/mixin-table";

    tableData: TableData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
}

@Component({
    template: `
        <div style="margin: 4px;">
            <j-table #table [data]="tableData1" (selectedRowChange)="table.selectedRow=-1"></j-table>
        </div>
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
