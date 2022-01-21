import {Component} from "@angular/core";
import {
    AdditionalColumnDefine,
    ColumnDefine, DataFilterInfo,
    PageableTreeTableData,
    TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer,
    TreeTableCellRenderer,
    TreeTableData
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TreeTableDemoComponent {

    public treeTableData: TreeTableData;
    public localPageableTreeTableData: PageableTreeTableData;

    getRow(level: number) {
        return Array.from(new Array(4).keys()).map(num => `cell${level}-${num}`)
    }

    constructor() {
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
                                {data: this.getRow(111)},
                                {data: this.getRow(112)},
                                {data: this.getRow(113)},
                                {data: this.getRow(114)},
                                {data: this.getRow(115)},
                                {data: this.getRow(116)},
                                {data: this.getRow(117)},
                                {data: this.getRow(118)},
                                {data: this.getRow(119)},
                                {data: this.getRow(120)},
                                {data: this.getRow(121)},
                                {data: this.getRow(122)},
                                {data: this.getRow(123)},
                                {data: this.getRow(124)}
                            ]
                        },
                        {
                            data: this.getRow(12),
                            nodes: [
                                {data: this.getRow(121)},
                                {data: this.getRow(122)},
                                {data: this.getRow(123)},
                                {data: this.getRow(124)}
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
                                {data: this.getRow(211)},
                                {data: this.getRow(212)},
                                {data: this.getRow(213)},
                                {data: this.getRow(214)}
                            ]
                        },
                        {
                            data: this.getRow(22),
                            nodes: [
                                {data: this.getRow(221)},
                                {data: this.getRow(222)},
                                {data: this.getRow(223)},
                                {data: this.getRow(224)}
                            ]
                        },
                        {
                            data: this.getRow(23),
                            nodes: [
                                {data: this.getRow(231)},
                                {data: this.getRow(232)},
                                {data: this.getRow(233)},
                                {data: this.getRow(234)}
                            ]
                        }
                    ]
                },
                {isParent: true, data: this.getRow(3)}
            ]
        });

        this.localPageableTreeTableData = new PageableTreeTableData();
        this.localPageableTreeTableData.pagingInfo.pageSize = 5;
        this.localPageableTreeTableData.fromObject({
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
                                {data: this.getRow(111)},
                                {data: this.getRow(112)},
                                {data: this.getRow(113)},
                                {data: this.getRow(114)}
                            ]
                        },
                        {
                            data: this.getRow(12),
                            nodes: [
                                {data: this.getRow(121)},
                                {data: this.getRow(122)},
                                {data: this.getRow(123)},
                                {data: this.getRow(124)}
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
                                {data: this.getRow(211)},
                                {data: this.getRow(212)},
                                {data: this.getRow(213)},
                                {data: this.getRow(214)}
                            ]
                        },
                        {
                            data: this.getRow(22),
                            nodes: [
                                {data: this.getRow(221)},
                                {data: this.getRow(222)},
                                {data: this.getRow(223)},
                                {data: this.getRow(224)}
                            ]
                        },
                        {
                            data: this.getRow(23),
                            nodes: [
                                {data: this.getRow(231)},
                                {data: this.getRow(232)},
                                {data: this.getRow(233)},
                                {data: this.getRow(234)}
                            ]
                        }
                    ]
                },
                {isParent: true, data: this.getRow(3)}
            ]
        });
    }

    columns: ColumnDefine[] = [
        {
            target: 'field0',
            cell: {
                renderer: TreeTableCellRenderer
            }
        }
    ];

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: '60px',
        header: {
            renderer: TableHeadCheckboxRenderer
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row) => td.data[row][0].data.endsWith('1-0')
        }
    }];

    search($event) {
        this.localPageableTreeTableData.filter($event, ['field1']);
        //this.localPageableTreeTableData.filter(new DataFilterInfo($event, ['field1']));
    }

    searchForRequire() {
        this.localPageableTreeTableData.filter((value, index, arr) => {
            return parseInt(value[1].split('-')[0].replace('cell', '')) < 100
        });
    }

    nodeOpen($event) {
        console.log('tree node open change: ', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
