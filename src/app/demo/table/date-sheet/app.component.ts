import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {TableCellRendererBase} from "../../../../jigsaw/component/table/table-renderer";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

export class DateSheetTableData extends TableData {
    year: number = new Date().getFullYear();
    month: number = new Date().getMonth();
}

@Component({
    templateUrl: './app.component.html'
})
export class TableDateSheetDemoComponent {
    tableData: DateSheetTableData;

    colDef = [
        {
            target: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            cell: {
                renderer: DateSheetRenderer
            }
        }
    ];

    constructor() {
        this.tableData = new DateSheetTableData(
            [
                [11, 22, 33, 44, 55, 66, 77],
                [11, 22, 33, 44, 55, 66, 77],
                [11, 22, 33, 44, 55, 66, 77],
                [11, 22, 33, 44, 55, 66, 77],
                [11, 22, 33, 44, 55, 66, 77],
            ],
            ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',]
        );
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

@Component({
    template: `
        <div class="date-cell" [ngClass]="{weekEnd: weekEnd}">
            <p class="date-text">{{date}}</p>
            <p class="kpi-text" *ngIf="date">{{cellData}}%</p>
        </div>
    `,
    styles: [`
        .date-cell {
            height: 70px;
            margin: 0 -9px 0 -9px;
            color: #ababab;
        }

        .date-text {
            margin-left: 6px;
            float: left;
        }

        .kpi-text {
            padding-top: 18px;
            padding-left: 20px;
            font-size: 25px;
            color: #c7220f;
        }

        .weekEnd {
            background-color: #efefef;
        }
    `]
})
export class DateSheetRenderer extends TableCellRendererBase {
    get weekEnd(): boolean {
        return this.column == 0 || this.column == 6;
    }

    private _date: string = undefined;

    get date(): string {
        if (CommonUtils.isUndefined(this._date)) {
            const td: DateSheetTableData = <DateSheetTableData>this.tableData;
            const dateObject = new Date(`${td.year}-${td.month + 1}-1 00:00:00`);
            const daysOfMonth = new Date(dateObject.getFullYear(), (dateObject.getMonth() + 1), 0).getDate();
            const weekDay = dateObject.getDay();
            const date = this.row == 0 && this.column < weekDay ? 0 : this.row * 7 + this.column - weekDay + 1;
            this._date = String(date <= daysOfMonth && date > 0 ? date : '');
        }
        return this._date;
    }
}
