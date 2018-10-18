import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {OfficeHeaderRenderer} from "../renderer/renderers";
import {TableCellRendererBase, TableCellSelectRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './demo.component.html'
})
export class TableSetCellRenderDemoComponent {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    offices: any[];

    columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.jobCellRender
            }
        },
        {
            target: 'office', width: '180',
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: (tableData, row, col) => {
                    console.log('tableData =====> ', tableData, row, col);
                    // 找出当前列所有可选项
                    if (!this.offices) {
                        this.offices = tableData.data.reduce(
                            (offices, row) => {
                                if (offices.findIndex(office => office.label == row[col]) == -1) {
                                    offices.push({label: row[col]})
                                }
                                return offices;
                            }, []);
                    }
                    return this.offices;
                },
                editable: true
            },
            header: {
                renderer: OfficeHeaderRenderer
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable.columnDefines',
        'ColumnDefine',
        'TableCell.renderer'
    ];
}




