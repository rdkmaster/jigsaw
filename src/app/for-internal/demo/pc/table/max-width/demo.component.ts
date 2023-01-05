import { Component } from "@angular/core";
import { AdditionalColumnDefine, ColumnDefine, TableCellCheckboxRenderer, TableData, TableHeadCheckboxRenderer, TableValueGenerators } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableMaxWidthDemoComponent {
    public tableData: TableData;
    public tableData2: TableData;

    public columnDefines: ColumnDefine[] = [
        {
            target: 0,
            width: "byContent",
            maxWidth: 800
        },
        {
            target: 1,
            width: "byContent",
            maxWidth: 300,
            cell: {
                tooltip: TableValueGenerators.originCellDataGenerator
            }
        }
    ];

    public columnDefines2: ColumnDefine[] = [
        {
            target: 0,
            maxWidth: 300
        },
        {
            target: 1,
            maxWidth: 300,
            cell: {
                tooltip: TableValueGenerators.originCellDataGenerator
            }
        }
    ];

    public columnDefines3: ColumnDefine[] = [
        {
            target: [0, 2, 4, 6, 8, 10],
            maxWidth: 300
        }
    ];

    public additionalColumnDefines: AdditionalColumnDefine[] = [{
        pos: 0,
        width: "byContent",
        maxWidth: 20,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row, col) => {
                return td.data[row][2] == 'Developer'
            }
        }
    }];

    public additionalColumnDefines2: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '长长长长长长长长长长文本'
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    }];

    constructor() {
        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect 长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winters1",
                    "Accountant 长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名长长长长长长长长长长长长长长长长长长长长长长长长文本", "职位", "薪资", "入职日期", "部门", "其他"]);

        this.tableData2 = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect 长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542",
                    "文本",
                    "文本",
                    "文本",
                    "文本",
                    "文本",
                    "文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant 长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本",
                    "长长长长长长长长长长长长长长长长长长长长长长长长长长文本"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn", "col1", "col2", "col3", "col4", "col5", "col6",],
            ["姓名长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "职位长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "薪资长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "入职日期长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "部门长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "其他长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列1长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列2长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列3长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列4长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列5长长长长长长长长长长长长长长长长长长长长长长长长文本",
                "列6长长长长长长长长长长长长长长长长长长长长长长长长文本"
            ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
