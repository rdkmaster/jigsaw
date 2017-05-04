import {AfterContentInit, Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "../../../../../component/table/table-api";

@Component({
    templateUrl: 'rendererOfTemplateRef.html',
    styleUrls: ['rendererOfTemplateRef.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererOfTemplateRefDemoComponent implements AfterContentInit{
    outerValue: string = '&outer';
    @ViewChild('headIcon') headIcon: TemplateRef<any>;
    @ViewChild('checkboxRenderer') checkboxRenderer: TemplateRef<any>;
    @ViewChild('cellOption') cellOption: TemplateRef<any>;

    tableData: TableData;

    private _columns: ColumnDefine[];
    private _additionalColumns: AdditionalColumnDefine[];

    constructor() {
        this.tableData = new TableData([
            [22, 12, 11, 0, 12, 12, 111],
            [22, 23, 11, 1, 23, 23, 111],
            [22, 43, 11, 1, 43, 77, 111],
            [22, 12, 12, 0, 12, 77, 111],
            [23, 55, 23, 1, 23, 23, 111],
            [43, 55, 43, 0, 44, 43, 111],
            [12, 55, 12, 1, 44, 12, 111],
            [23, 55, 23, 1, 44, 23, 111],
            [43, 43, 43, 0, 44, 43, 111],
            [12, 12, 33, 0, 12, 66, 111],
            [23, 23, 33, 0, 88, 66, 111],
            [43, 43, 33, 1, 88, 66, 111],
            [12, 11, 12, 1, 88, 66, 111],
            [23, 11, 23, 0, 23, 23, 111],
            [43, 43, 43, 1, 43, 43, 111],
            [12, 12, 12, 1, 99, 12, 111],
            [23, 23, 23, 0, 99, 23, 111],
            [43, 43, 43, 1, 99, 43, 111]
        ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);
    }

    handleClick(cellInfo){
        alert(`row: ${cellInfo.row}, column: ${cellInfo.column}, rawColumn: ${cellInfo.field}, cellData: ${cellInfo.cellData}`)
    }

    ngAfterContentInit(){
        this._columns = [
            {
                target: ['f1', 'f3', 'f5', 'f7'],
                width: '15%',
                header: {
                    renderer: this.headIcon
                }
            },
            /*{
                target: 'f4',
                cell: {
                    renderer: this.checkboxRenderer
                }
            }*/
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

