import {AfterContentInit, Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-api";

@Component({
    templateUrl: 'rendererOfTemplateRef.html',
    styleUrls: ['rendererOfTemplateRef.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererOfTemplateRefDemoComponent implements AfterContentInit{
    @ViewChild('headIcon') headIcon: TemplateRef<any>;
    @ViewChild('checkboxRenderer') checkboxRenderer: TemplateRef<any>;
    @ViewChild('cellOption') cellOption: TemplateRef<any>;

    tableData: TableData;
    nativeValue: string = ' - native';

     _columns: ColumnDefine[];
     _additionalColumns: AdditionalColumnDefine[];

    constructor(http: Http) {

        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');

        // this.tableData = new TableData([
        //     [22, 12, 11, 0, 12, 12, 111],
        //     [22, 23, 11, 1, 23, 23, 111],
        //     [22, 43, 11, 1, 43, 77, 111],
        //     [22, 12, 12, 0, 12, 77, 111],
        //     [23, 55, 23, 1, 23, 23, 111],
        //     [43, 55, 43, 0, 44, 43, 111],
        //     [12, 55, 12, 1, 44, 12, 111],
        //     [23, 55, 23, 1, 44, 23, 111],
        //     [43, 43, 43, 0, 44, 43, 111],
        //     [12, 12, 33, 0, 12, 66, 111],
        //     [23, 23, 33, 0, 88, 66, 111],
        //     [43, 43, 33, 1, 88, 66, 111],
        //     [12, 11, 12, 1, 88, 66, 111],
        //     [23, 11, 23, 0, 23, 23, 111],
        //     [43, 43, 43, 1, 43, 43, 111],
        //     [12, 12, 12, 1, 99, 12, 111],
        //     [23, 23, 23, 0, 99, 23, 111],
        //     [43, 43, 43, 1, 99, 43, 111]
        // ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);
    }

    handleClick(context){
        alert(`row: ${context.row}, column: ${context.column}, cellData: ${context.cellData}`)
    }

    ngAfterContentInit(){
        //请不要在ngAfterViewInit里面赋值，会报变更检查错误
        this._columns = [
            {
                target: ['name', 'salary', 'office'],
                width: '15%',
                header: {
                    renderer: this.headIcon
                }
            }
        ];
        this._additionalColumns = [
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

}

