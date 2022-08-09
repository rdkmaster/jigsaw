import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData, ColumnDefine, TableCellRendererBase} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class RebuildTableDataDemoComponent {
    tableData: PageableTableData;

    constructor(public http: HttpClient) {
       this.tableData = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: {aa: 11, bb: 22}, method: 'post'
        });
        this.tableData.fromAjax();
    }

    columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                renderer: JobCellRender
            }
        }
    ];

    changeData() {
        this.tableData = new PageableTableData(this.http, {
            url: 'mock-data/hr-list-short', body: {aa: 11, bb: 22}, method: 'post'
        });
        this.tableData.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

@Component({
    template: `
        <div [ngSwitch]="cellData" style="font-size: 16px;" (click)="showData()">
            <span *ngSwitchCase="'Test Engineer'" class="iconfont iconfont-e567"></span>
            <span *ngSwitchCase="'System Architect'" class="iconfont iconfont-e451"></span>
            <span *ngSwitchCase="'Developer'" class="iconfont iconfont-e4f0"></span>
        </div>
    `
})
export class JobCellRender extends TableCellRendererBase {
    showData() {
        console.log(this.tableData);
    }
}
