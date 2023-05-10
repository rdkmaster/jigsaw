import {Component} from "@angular/core";
import {ColumnDefine, JigsawThemeService, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableUpdateColumnDefinesDemoComponent {
    tableData: TableData;

    constructor(private _themeService: JigsawThemeService) {
        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    // 这里为了能让demo同时适配深浅色系才做的这么复杂，如果应用没有深浅色系前的需求，则无需搞这么复杂
    optionStyle = `background-color: ${this._themeService.majorStyle == 'dark' ? '#0f111a' : '#fff'}`;
    columnDefines: ColumnDefine[];

    changeColumnDefine() {
        this.columnDefines = [
            {
                target: 2,
                header: {
                    renderer: 'html',
                    data: (data, col) => `${data.header[col]}
                    <select id="unitSelect" style="padding: 4px 8px;
                                    margin-left: 4px;
                                    font-size: 12px;
                                    background: transparent;
                                    -webkit-appearance: none;
                                    border-radius: 4px;">
                        <option style="${this.optionStyle}" value="￥">￥</option>
                        <option style="${this.optionStyle}" value="$">$</option>
                    </select>`
                }
            },
            {
                target: 5,
                header: {
                    "sortable": true,
                    "sortAs": 1,
                },
                "cell": {
                    "renderer": "html",
                    "data": (td, row, col) => !parseInt(td.data[row][col]) ? td.data[row][col] : `<a (click)="onClick1(${row}, ${col})">${td.data[row][col]}</a>`,
                    "innerHtmlContext": {onClick1: (row, col) => console.log(row, col)}
                }
            }
        ];
        setTimeout(() => {
            this.tableData.refresh();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
