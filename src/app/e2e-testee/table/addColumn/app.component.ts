import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-typings";
import {Http} from "@angular/http";
import {TableCellRendererBase} from "../../../../jigsaw/component/table/table-renderer";

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
        <a href="javascript:;" (click)="clickHandler('修改')">修改</a>
        <a href="javascript:;" (click)="clickHandler('删除')">删除</a>`,
    styles: [`a {
        color: #ffaa00
    }

    a:hover {
        text-decoration: underline
    }`]
})
export class MyTableCellOption extends TableCellRendererBase {
    clickHandler(actioin) {
        alert(`正在${actioin}第 ${this.row + 1} 行的数据！`)
    }
}

@Component({
    templateUrl: './app.component.html'
})
export class TableAddColumnDemoComponent {
    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }


     additionalColumns: AdditionalColumnDefine[] = [{
        header: {
            renderer: MyTableHeadOption,
        },
        cell: {
            renderer: MyTableCellOption
        }
    }]
}



