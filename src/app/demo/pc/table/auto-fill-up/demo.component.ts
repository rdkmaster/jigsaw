import { Component } from "@angular/core";
import { TableData, ColumnDefine, TableCellTextEditorRenderer, TableCellAutoCompleteEditorRenderer, TableCellNumericEditorRenderer, ArrayCollection, TreeTableData, TreeTableCellRenderer, LocalPageableTableData } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TableAutoFillUpDemoComponent {
    scenario: "common" | "tree" | "pageable" = "common";

    scenarioList = new ArrayCollection([
        "common",
        "tree",
        "pageable"
    ]);

    tableData: TableData;
    treeTableData: TreeTableData;
    pageable: LocalPageableTableData;

    _$noData() {
        this.tableData.fromObject({
            data: [],
            field: ["name", "position", "salary"],
            header: ["姓名", "职位", "薪资"]
        });
    }

    _$updateData() {
        const _data = [];
        for (let i = 1; i < Math.floor(Math.random() * 7) + 2; i++) {
            _data.push(["Tiger Nixon" + i, "System Architect", "8000"]);
            _data.push(["Garrett Winflters" + i, "Accountant", "9000"]);
        }

        this.tableData.fromObject({
            data: _data,
            field: ["name", "position", "salary"],
            header: ["姓名", "职位", "薪资"]
        });
    }

    columnsCommonRender: ColumnDefine[] = [
        {
            target: "name",
            width: "40%",
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    clearable: true
                }
            }
        },
        {
            target: "position",
            width: "40%",
            cell: {
                editable: true,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: () => {
                    return {
                        placeholder: "Try to edit...",
                        data: ["Developer", "System Architect", "Test Engineer"]
                    };
                }
            }
        },
        {
            target: "salary",
            width: "20%",
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 1000
                }
            }
        }
    ]

    getRow(level: number) {
        return Array.from(new Array(4).keys()).map(num => `cell${level}-${num}`)
    }

    columnsTree: ColumnDefine[] = [
        {
            target: 'field0',
            cell: {
                renderer: TreeTableCellRenderer
            }
        }
    ];

    constructor(http: HttpClient) {
        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", "8000"],
                ["Garrett Winflters1", "Accountant", "9000"],
                ["Tiger Nixon2", "System Arcfhitect", "8000"],
                ["Garrett Winslters2", "Accountant", "9000"],
                ["Tiger Nixon3", "System Arcfhitect", "8000"],
                ["Garrett Winflters3", "Accountant", "9000"]
            ],
            ["name", "position", "salary"],
            ["姓名", "职位", "薪资"]
        );

        this.treeTableData = new TreeTableData();
        this.treeTableData.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            treeField: 'field0',
            treeData: [
                {
                    open: true,
                    data: this.getRow(1),
                    nodes: [
                        {
                            open: true,
                            data: this.getRow(11),
                            nodes: [
                                { data: this.getRow(111) },
                                { data: this.getRow(112) },
                                { data: this.getRow(113) },
                                { data: this.getRow(114) }
                            ]
                        },
                        {
                            data: this.getRow(12),
                            nodes: [
                                { data: this.getRow(121) },
                                { data: this.getRow(122) },
                                { data: this.getRow(123) },
                                { data: this.getRow(124) }
                            ]
                        },
                        {
                            data: this.getRow(13),
                            isParent: true
                        }
                    ]
                },
                {
                    open: true,
                    data: this.getRow(2),
                    nodes: [
                        {
                            open: true,
                            data: this.getRow(21),
                            nodes: [
                                { data: this.getRow(211) },
                                { data: this.getRow(212) },
                                { data: this.getRow(213) },
                                { data: this.getRow(214) }
                            ]
                        },
                        {
                            data: this.getRow(22),
                            nodes: [
                                { data: this.getRow(221) },
                                { data: this.getRow(222) },
                                { data: this.getRow(223) },
                                { data: this.getRow(224) }
                            ]
                        },
                        {
                            data: this.getRow(23),
                            nodes: [
                                { data: this.getRow(231) },
                                { data: this.getRow(232) },
                                { data: this.getRow(233) },
                                { data: this.getRow(234) }
                            ]
                        }
                    ]
                },
                { isParent: true, data: this.getRow(3) }
            ]
        });

        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此Demo展示了表格在不同数据场景，设置高度属性后，自动填满空白行的功能。";
    description: string = "";
}
