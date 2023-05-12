import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ColumnDefine, JigsawThemeService, TableData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-column-defines-update-column-defines',
    templateUrl: './demo.component.html'
})
export class TableUpdateColumnDefinesDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/update-column-defines";

    public tableData: TableData;

    // 这里为了能让demo同时适配深浅色系才做的这么复杂，如果应用没有深浅色系前的需求，则无需搞这么复杂
    public optionStyle = `background-color: ${this._themeService.majorStyle == 'dark' ? '#0f111a' : '#fff'}`;
    public columnDefines: ColumnDefine[];

    public changeColumnDefine() {
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
                    "innerHtmlContext": { onClick1: (row, col) => console.log(row, col) }
                }
            }
        ];
        setTimeout(() => {
            this.tableData.refresh();
        })
    }

    constructor(http: HttpClient, el: ElementRef, private _themeService: JigsawThemeService) {
        super(http, el);
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
}
