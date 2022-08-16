import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    BigTableData, ViewportScrollEvent, AdditionalColumnDefine, ColumnDefine,
    TableValueGenerators
} from "jigsaw/public_api";
import {OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer} from "./renderers";
import {TableBigDataTextService} from "../doc.service";

@Component({
    selector:'table-big-table',
    templateUrl: './demo.component.html'
})
export class BigTableDataDemoComponent {
    tableData: BigTableData;

    constructor(public http: HttpClient, public text: TableBigDataTextService) {
        this.tableData = new BigTableData(http, 'mock-data/big-table-data');
        this.tableData.pagingInfo.pageSize = 1000;
        this.tableData.viewport.rows = 10;
        this.tableData.viewport.columns = 10;
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

    selectedStep = 10;

    viewChangeMessage: string = '';

    handleViewChange(event: ViewportScrollEvent) {
        // 使用setTimeout触发变更检查
        setTimeout(() => {
            this.viewChangeMessage = `${event.direction == 'horizontal' ? '水平' : '垂直'}方向移动到${event.scrollTo}`;
        });
    }
}
