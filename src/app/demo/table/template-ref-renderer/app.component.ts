import {AfterContentInit, Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererOfTemplateRefDemoComponent implements AfterContentInit {
    @ViewChild('headIcon') headIcon: TemplateRef<any>;
    @ViewChild('checkboxRenderer') checkboxRenderer: TemplateRef<any>;
    @ViewChild('cellOption') cellOption: TemplateRef<any>;
    @ViewChild('cellName') cellName: TemplateRef<any>;

    tableData: TableData;
    nativeValue: string = ' - native';

    columns: ColumnDefine[];
    additionalColumns: AdditionalColumnDefine[];

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

    ngAfterContentInit() {
        //请不要在ngAfterViewInit里面赋值，会报变更检查错误
        this.columns = [
            {
                target: ['salary', 'office'],
                width: '15%',
                header: {
                    renderer: this.headIcon
                }
            },
            {
                target: 'name',
                width: '15%',
                cell: {
                    renderer: this.cellName
                }
            }
        ];
        this.additionalColumns = [
            {
                width: '15%',
                header: {
                    text: '操作'
                },
                cell: {
                    renderer: this.cellOption
                }
            }
        ]
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

