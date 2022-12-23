import { Component } from "@angular/core";
import { TableData, AdditionalColumnDefine, TableHeadCheckboxRenderer, TableCellCheckboxRenderer, ColumnDefine, TableValueGenerators, TreeTableData, TreeTableCellRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableAlignContentDemoComponent {
    tableData: TableData;
    treeTableData: TreeTableData;

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 40,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
        }
    }];

    columnDefines: ColumnDefine[] = [
        {
            target: ['name'],
            header: {
                alignment: 'right',
                clazz: 'xxxxxxx'
            },
            cell: {
                alignment: 'right'
            },
        },
        {
            target: ['salary'],
            header: {
                alignment: 'center'
            },
            cell: {
                alignment: 'center'
            },
        },
        {
            target: ['office'],
            header: {
                alignment: 'left',
                noPadding: true
            },
            cell: {
                alignment: 'left',
                noPadding: true
            },
        },
        {
            target: ['tooltip'],
            cell: {
                tooltip: TableValueGenerators.originCellDataGenerator
            },
        }
    ];

    treeColumnDefines: ColumnDefine[] = [
        {
            "target": [
                0
            ],
            "visible": true,
            "header": {
                "text": "",
                "alignment": "left",
                "noPadding": false,
                "filterable": false
            },
            "cell": {
                "renderer": TreeTableCellRenderer,
                "alignment": "left"
            }
        }
    ]

    constructor() {
        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Wintsers2",
                    "Accountant",
                    "$170,50",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$3,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"],
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,80",
                    "2011/04/25",
                    "Edinburgh",
                    "54211",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "84212", "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tigesr Nixon1",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ],
                [
                    "Tigers Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "超长文本超长文本超长文本超长文本超长文本超长文本"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn", "tooltip"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他", "超长文本"]);

        this.treeTableData = new TreeTableData();
        this.treeTableData.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            treeField: 'field0',
            treeData: [
                {
                    open: true,
                    data: ['cell1-0', 'cell1-1', 'cell1-2', 'cell1-3'],
                    nodes: [
                        {
                            open: true,
                            data: ['cell11-0', 'cell11-1', 'cell11-2', 'cell11-3'],
                            nodes: [
                                { data: ['cell111-0 string string string string string string string string string string string string', 'cell111-1', 'cell111-2', 'cell111-3'] },
                                { data: ['cell112-0', 'cell112-1', 'cell112-2', 'cell112-3'] },
                                { data: ['cell113-0 string string string string string string string string string string string string', 'cell113-1', 'cell113-2', 'cell113-3'] },
                                { data: ['cell114-0中文超长长长长长长长长长长长长长长长长长长长长长文本', 'cell114-1', 'cell114-2', 'cell114-3'] }
                            ]
                        },
                        {
                            data: ['cell12-0', 'cell12-1', 'cell12-2', 'cell12-3'],
                            nodes: [
                                { data: ['cell121-0', 'cell121-1', 'cell121-2', 'cell121-3'] },
                                { data: ['cell122-0', 'cell122-1', 'cell122-2', 'cell122-3'] },
                                { data: ['cell123-0', 'cell123-1', 'cell123-2', 'cell123-3'] },
                                { data: ['cell124-0', 'cell124-1', 'cell124-2', 'cell124-3'] }
                            ]
                        },
                        {
                            data: ['cell32-0', 'cell13-1', 'cell13-2', 'cell13-3'],
                            isParent: true
                        }
                    ]
                },
                {
                    open: true,
                    data: ['cell2-0', 'cell2-1', 'cell2-2', 'cell2-3'],
                    nodes: [
                        {
                            open: true,
                            data: ['cell21-0', 'cell21-1', 'cell21-2', 'cell21-3'],
                            nodes: [
                                { data: ['cell211-0', 'cell211-1', 'cell211-2', 'cell211-3'] },
                                { data: ['cell212-0', 'cell212-1', 'cell212-2', 'cell212-3'] },
                                { data: ['cell213-0', 'cell213-1', 'cell213-2', 'cell213-3'] },
                                { data: ['cell214-0', 'cell214-1', 'cell214-2', 'cell214-3'] }
                            ]
                        },
                        {
                            data: ['cell22-0', 'cell22-1', 'cell22-2', 'cell22-3'],
                            nodes: [
                                { data: ['cell221-0', 'cell221-1', 'cell221-2', 'cell221-3'] },
                                { data: ['cell222-0', 'cell222-1', 'cell222-2', 'cell222-3'] },
                                { data: ['cell223-0', 'cell223-1', 'cell223-2', 'cell223-3'] },
                                { data: ['cell224-0', 'cell224-1', 'cell224-2', 'cell224-3'] }
                            ]
                        },
                        {
                            data: ['cell23-0', 'cell23-1', 'cell23-2', 'cell23-3'],
                            nodes: [
                                { data: ['cell231-0', 'cell231-1', 'cell231-2', 'cell231-3'] },
                                { data: ['cell232-0', 'cell232-1', 'cell232-2', 'cell232-3'] },
                                { data: ['cell233-0', 'cell233-1', 'cell233-2', 'cell233-3'] },
                                { data: ['cell234-0', 'cell234-1', 'cell234-2', 'cell234-3'] }
                            ]
                        }
                    ]
                },
                { isParent: true, data: ['cell3-0', 'cell3-1', 'cell3-2', 'cell3-3'] }
            ]
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
