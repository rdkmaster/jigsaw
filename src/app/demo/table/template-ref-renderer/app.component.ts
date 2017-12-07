import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererOfTemplateRefDemoComponent {
    @ViewChild('headIcon') headIcon: TemplateRef<any>;
    @ViewChild('checkboxRenderer') checkboxRenderer: TemplateRef<any>;
    @ViewChild('cellOption') cellOption: TemplateRef<any>;
    @ViewChild('cellName') cellName: TemplateRef<any>;

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

}

