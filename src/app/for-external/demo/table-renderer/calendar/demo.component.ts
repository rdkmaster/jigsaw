import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { TableData, TableCellRendererBase, CommonUtils } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

export class CalendarTableData extends TableData {
    year: number = new Date().getFullYear();
    month: number = new Date().getMonth();
}

@Component({
    selector: 'table-calendar',
    templateUrl: './demo.component.html'
})
export class TableCalendarDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-renderer/calendar";

    public tableData: CalendarTableData;

    public colDef = [
        {
            target: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            cell: {
                noPadding: true,
                renderer: CalendarDateRenderer
            }
        }
    ];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
}

@Component({
    template: `
        <div class="date-cell" [ngClass]="{weekEnd: weekEnd}">
            <p class="date-text">{{date}}</p>
            <p class="status" [ngClass]="status" *ngIf="date">
                <span *ngIf="cellData < 100">{{cellData}}%</span>
                <span *ngIf="cellData >= 100" class="iconfont iconfont-e13f status-done"></span>
            </p>
        </div>
    `,
    styles: [`
        .date-cell {
            width:100%;
            height: 70px;
            color: #ababab;
        }

        .date-text {
            margin-left: 6px;
            float: left;
        }

        .status {
            padding-top: 22px;
            font-size: 20px;
            color: #c7220f;
            text-align:center;
        }

        .status-good {
            color: #1bc713;
        }

        .status-less-well {
            color: #c7220f;
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
