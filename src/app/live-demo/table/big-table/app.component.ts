import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BigTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine, TableValueGenerators} from "jigsaw/component/table/table-typings";
import {OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer} from "./renderers";

@Component({
    templateUrl: './app.component.html'
})
export class BigTableDataDemoComponent {
    tableData: BigTableData;

    constructor(public http: HttpClient) {
        this.tableData = new BigTableData(http, 'mock-data/big-table-data');
        this.tableData.pagingInfo.pageSize = 900;
        this.tableData.viewPort.rows = 10;
        this.tableData.viewPort.columns = 10;
        this.tableData.fromAjax();
    }

    columnDefines: ColumnDefine[] = [
        {
            target: 'field-2',
            width: 120,
            header: {
                renderer: PositionHeaderRenderer
            }
        },
        {
            target: 'field-5',
            width: 200,
            header: {
                renderer: OfficeHeaderRenderer
            },
            cell: {
                renderer: OfficeCellRenderer
            }
        },
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
            }
        }
    ];

    steps = [1, 3, 5, 7, 9];
    selectedStep = 1;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了表格呈现海量数据时的一个解决方案，它能够以常数时间处理任何量级的数据。';
    description: string = require('!!raw-loader!./readme.md');
}

