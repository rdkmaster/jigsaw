import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, TableCellRenderer} from "jigsaw/component/table/table-api";
import {Http} from "@angular/http";

/*
 * 操作列头
 * */
@Component({
    template: '<span>操作</span>'
})
export class MyTableHeadOption extends TableCellRenderer {
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
export class MyTableCellOption extends TableCellRenderer {
    clickHandler(actioin) {
        alert(`正在${actioin}第 ${this.row + 1} 行的数据！`)
    }
}

@Component({
    templateUrl: 'addColumn.html'
})
export class TableAddColumnDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }


     _additionalColumns: AdditionalColumnDefine[] = [{
        header: {
            renderer: MyTableHeadOption,
        },
        cell: {
            renderer: MyTableCellOption
        }
    }]
}



