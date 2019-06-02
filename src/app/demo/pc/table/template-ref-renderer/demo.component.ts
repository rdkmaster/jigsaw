import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/pc-components/table/table-typings";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererOfTemplateRefDemoComponent {
    @ViewChild('headIcon', {static: false}) headIcon: TemplateRef<any>;
    @ViewChild('checkboxRenderer', {static: false}) checkboxRenderer: TemplateRef<any>;
    @ViewChild('cellOption', {static: false}) cellOption: TemplateRef<any>;
    @ViewChild('cellName', {static: false}) cellName: TemplateRef<any>;

    tableData: TableData;
    nativeValue: string = ' - native';

    columns: ColumnDefine[] = [
        {
            target: ['salary', 'office'],
            width: '15%',
            header: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.headIcon
            }
        },
        {
            target: 'name',
            width: '15%',
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.cellName
            }
        }
    ];

    additionalColumns: AdditionalColumnDefine[] = [
        {
            width: '15%',
            header: {
                text: '操作'
            },
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.cellOption
            }
        }
    ];

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    changeData() {
        let arr = this.tableData.data.slice(-3);
        console.log(arr);
        this.tableData.data = arr;
        this.tableData.refresh();
    }

    handleClick(context) {
        alert(`row: ${context.row}, column: ${context.column}, cellData: ${context.cellData}`)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'TableHeader.renderer',
        'TableCell.renderer',
        'ColumnDefine.header',
        'ColumnDefine.cell',
        'AdditionalColumnDefine.header',
        'AdditionalColumnDefine.cell',
        'JigsawTable.columnDefines',
        'JigsawTable.additionalColumnDefines',
    ];
}

