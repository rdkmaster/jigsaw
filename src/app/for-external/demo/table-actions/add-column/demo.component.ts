import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, AdditionalColumnDefine, TableCellRendererBase } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

/*
 * 操作列头
 * */
@Component({
    template: '<span>操作</span>'
})
export class MyTableHeadOption extends TableCellRendererBase {
}

/*
 * 操作列
 * */
@Component({
    template: `
        <div class="demo-link">
            <a href="javascript:;" (click)="clickHandler('修改')">修改</a>
            <a href="javascript:;" (click)="clickHandler('删除')">删除</a>
        </div>
    `,
    styles: [`
        .demo-link a {
            color: #ffaa00
        }

        .demo-link a:hover {
            text-decoration: underline
        }
    `]
})
export class MyTableCellOption extends TableCellRendererBase {
    public clickHandler(action) {
        alert(`正在${action}第 ${this.row + 1} 行的数据！`)
    }
}

@Component({
    selector: 'table-add-column',
    templateUrl: './demo.component.html'
})
export class TableAddColumnDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/add-column";

    public tableData: TableData;

    public additionalColumns: AdditionalColumnDefine[] = [{
        header: {
            renderer: MyTableHeadOption,
        },
        cell: {
            renderer: MyTableCellOption
        }
    }];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
