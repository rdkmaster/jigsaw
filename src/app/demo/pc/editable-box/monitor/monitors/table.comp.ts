import {Component, Input, Type, ViewChild} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/pc-components/table/table-renderer";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ToolbarComp} from "../comp/toolbar.comp";
import {AbstractMonitorsBase} from "./monitors-base";

export type TableCellData = {
    name: string, trend: string, dataOfToday: string, dateOfTheDayBefore: string, dateOfYesterday: string
}

@Component({
    template: `
        <div>
            <span>{{cellData.dataOfToday}}</span>
            <span style="color:green;" class="fa fa-arrow-up" *ngIf="cellData.trend == 'up'"></span>
            <span style="color:red;" class="fa fa-arrow-down" *ngIf="cellData.trend == 'down'"></span>
        </div>
    `
})
export class TrendingCellRenderer extends TableCellRendererBase {
}

@Component({
    selector: 'table-monitor',
    template: `
        <div class="wrapper" (mouseover)="_showToolbar = true" (mouseleave)="_showToolbar = false">
            <jx-toolbar [showRemove]="false" [component]="getComponent" [data]="data"
                        [visible]="_showToolbar" [chartId]="chartId">
            </jx-toolbar>
            <jigsaw-table [data]="_tableData" [columnDefines]="columnDefineGenerator" width="100%" height="100%">
            </jigsaw-table>
        </div>
    `,
    styles: [`
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #fff;
        }
    `]
})
export class TableMonitorComponent extends AbstractMonitorsBase {
    @ViewChild(ToolbarComp)
    protected toolbar: ToolbarComp;

    // 模板里的变量必须是public的
    public _showToolbar = false;
    public _tableData: TableData;
    private _data: TableCellData[][];

    @Input()
    get data(): TableCellData[][] {
        return this._data;
    }

    set data(value: TableCellData[][]) {
        this._data = value;
        this._parseTableData();
    }

    private _parseTableData(): void {
        if (!this.data || this.data.length == 0) {
            return;
        }

        this._tableData = new TableData();
        this.data.forEach(row => {
            let tableRow = [];
            row.forEach((cell, col) => tableRow.push(col <= 6 && col >= 1 ? cell : cell.dataOfToday));
            this._tableData.data.push(tableRow);
        });
        this.data[0].forEach(cell => {
            this._tableData.header.push(cell.name);
            this._tableData.field.push(cell.name);
        });
    }

    columnDefineGenerator(field, index): ColumnDefine {
        if (index >= 1 && index <= 6) {
            return {
                cell: {
                    renderer: TrendingCellRenderer,
                    tooltip: (tableData, row, column) =>
                        '前天：' + tableData.data[row][column].dateOfTheDayBefore +
                        '\n昨天：' + tableData.data[row][column].dateOfYesterday +
                        '\n今天：' + tableData.data[row][column].dataOfToday
                },
            }
        } else {
            return undefined;
        }
    }

    public getComponent(): Type<AbstractMonitorsBase> {
        return TableMonitorComponent;
    }
}
