import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    BigTableData, ViewportScrollEvent, AdditionalColumnDefine, ColumnDefine,
    TableValueGenerators
} from "jigsaw/public_api";
import { OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer } from "./renderers";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-big-table',
    templateUrl: './demo.component.html'
})
export class BigTableDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-big-data/big-table";

    public tableData: BigTableData;

    public columnDefines: ColumnDefine[] = [
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

    public additionalColumnDefines: AdditionalColumnDefine[] = [
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

    public selectedStep = 10;

    public viewChangeMessage: string = '';

    public handleViewChange(event: ViewportScrollEvent) {
        // 使用setTimeout触发变更检查
        setTimeout(() => {
            this.viewChangeMessage = `${event.direction == 'horizontal' ? '水平' : '垂直'}方向移动到${event.scrollTo}`;
        });
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new BigTableData(http, 'mock-data/big-table-data');
        this.tableData.pagingInfo.pageSize = 1000;
        this.tableData.viewport.rows = 10;
        this.tableData.viewport.columns = 10;
        this.tableData.fromAjax();
    }
}
