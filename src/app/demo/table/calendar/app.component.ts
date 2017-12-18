import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {CommonUtils} from "jigsaw/core/utils/common-utils";

export class CalendarTableData extends TableData {
    year: number = new Date().getFullYear();
    month: number = new Date().getMonth();
}

@Component({
    templateUrl: './app.component.html'
})
export class TableCalendarDemoComponent {
    tableData: CalendarTableData;

    colDef = [
        {
            target: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            cell: {
                renderer: CalendarDateRenderer
            }
        }
    ];

    constructor() {
        this.tableData = new CalendarTableData(
            [
                [69, 16, 4, 47, 27, 54, 100],
                [47, 64, 74, 71, 87, 76, 88],
                [31, 50, 69, 66, 45, 87, 84],
                [62, 17, 100, 51, 52, 45, 25],
                [29, 63, 42, 46, 71, 72, 3],
            ],
            ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',]
        );
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '基于Table实现的日历功能';
    description: string = '';
}

@Component({
    template: `
        <div class="date-cell" [ngClass]="{weekEnd: weekEnd}">
            <p class="date-text">{{date}}</p>
            <p class="status" [ngClass]="status" *ngIf="date">
                <span *ngIf="cellData < 100">{{cellData}}%</span>
                <span *ngIf="cellData >= 100" class="fa fa-check status-done"></span>
            </p>
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

        .status {
            padding-top: 22px;
            padding-left: 24px;
            font-size: 20px;
            color: #c7220f;
        }

        .status-good {
            color: #1bc713;
        }

        .status-less-well {
            color: #c7220f;
        }
        
        .status-done {
            margin-left: 12px;
        }

        .weekEnd {
            background-color: #efefef;
        }
    `]
})
export class CalendarDateRenderer extends TableCellRendererBase {
    get weekEnd(): boolean {
        return this.column == 0 || this.column == 6;
    }

    private _date: string = undefined;

    get date(): string {
        if (CommonUtils.isUndefined(this._date)) {
            const td: CalendarTableData = <CalendarTableData>this.tableData;
            const dateObject = new Date(`${td.year}/${td.month + 1}/1 00:00:00`);
            const daysOfMonth = new Date(dateObject.getFullYear(), (dateObject.getMonth() + 1), 0).getDate();
            const weekDay = dateObject.getDay();
            const date = this.row == 0 && this.column < weekDay ? 0 : this.row * 7 + this.column - weekDay + 1;
            this._date = String(date <= daysOfMonth && date > 0 ? date : '');
        }
        return this._date;
    }

    get status() {
        return {
            'status-less-well': this.cellData <= 50, 'status-good': this.cellData > 50
        }
    }
}
