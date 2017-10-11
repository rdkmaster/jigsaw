import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BigTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine, TableValueGenerators} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html'
})
export class BigTableDataDemoComponent {
    tableData: BigTableData;

    constructor(public http: HttpClient) {
        this.tableData = new BigTableData(http, 'mock-data/hr-list-full');
        this.tableData.pagingInfo.pageSize = 200;
        this.tableData.viewPort.rows = 10;
        this.tableData.fromAjax('mock-data/hr-list-full');
    }

    scroll(value) {
        this.tableData.viewPort.fromRow = value;
    }

    columnDefines: ColumnDefine[] = [
        {
            target: 'desc', cell: {tooltip: '123'}
        }
    ];

    additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '50px',
            header: {
                text: '#',
            },
            cell: {
                data: TableValueGenerators.rowIndexGenerator,
                clazz: 'green-text'
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了表格的列定义模式的多个用法，包括列渲染器、列宽调整、列的宽文本控制，列tooltip等。';
    description: string = require('!!raw-loader!./readme.md');
}

