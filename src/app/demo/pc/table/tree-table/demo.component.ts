import {Component} from "@angular/core";
import {LocalPageableTreeTableData, TreeTableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {TableCellTreeNodeRenderer} from "jigsaw/pc-components/table/table-renderer";

@Component({
    templateUrl: './demo.component.html'
})
export class TreeTableDemoComponent {

    public treeTableData: TreeTableData;
    public localPageableTreeTableData: LocalPageableTreeTableData;

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
                    label: "父节点1 - 展开",
                    open: true,
                    level: 1,
                    data: this.getRow(1),
                    nodes: [
                        {
                            label: "父节点11 - 折叠",
                            open: true,
                            level: 11,
                            data: this.getRow(11),
                            nodes: [
                                {label: "叶子节点111", level: 111, data: this.getRow(111)},
                                {label: "叶子节点112", level: 112, data: this.getRow(112)},
                                {label: "叶子节点113", level: 113, data: this.getRow(113)},
                                {label: "叶子节点114", level: 114, data: this.getRow(114)}
                            ]
                        },
                        {
                            label: "父节点12 - 折叠",
                            level: 12,
                            data: this.getRow(12),
                            nodes: [
                                {label: "叶子节点121", level: 121, data: this.getRow(121)},
                                {label: "叶子节点122", level: 122, data: this.getRow(122)},
                                {label: "叶子节点123", level: 123, data: this.getRow(123)},
                                {label: "叶子节点124", level: 124, data: this.getRow(124)}
                            ]
                        },
                        {
                            label: "父节点13 - 没有子节点",
                            level: 13,
                            data: this.getRow(13),
                            isParent: true
                        }
                    ]
                },
                {
                    label: "父节点2 - 折叠",
                    open: true,
                    level: 2,
                    data: this.getRow(2),
                    nodes: [
                        {
                            label: "父节点21 - 展开",
                            open: true,
                            level: 21,
                            data: this.getRow(21),
                            nodes: [
                                {label: "叶子节点211", level: 211, data: this.getRow(211)},
                                {label: "叶子节点212", level: 212, data: this.getRow(212)},
                                {label: "叶子节点213", level: 213, data: this.getRow(213)},
                                {label: "叶子节点214", level: 214, data: this.getRow(214)}
                            ]
                        },
                        {
                            label: "父节点22 - 折叠",
                            level: 22,
                            data: this.getRow(22),
                            nodes: [
                                {label: "叶子节点221", level: 221, data: this.getRow(221)},
                                {label: "叶子节点222", level: 222, data: this.getRow(222)},
                                {label: "叶子节点223", level: 223, data: this.getRow(223)},
                                {label: "叶子节点224", level: 224, data: this.getRow(224)}
                            ]
                        },
                        {
                            label: "父节点23 - 折叠",
                            level: 23,
                            data: this.getRow(23),
                            nodes: [
                                {label: "叶子节点231", level: 231, data: this.getRow(231)},
                                {label: "叶子节点232", level: 232, data: this.getRow(232)},
                                {label: "叶子节点233", level: 233, data: this.getRow(233)},
                                {label: "叶子节点234", level: 234, data: this.getRow(234)}
                            ]
                        }
                    ]
                },
                {label: "父节点3 - 没有子节点", isParent: true, level: 3, data: this.getRow(3)}
            ]
        });

        this.localPageableTreeTableData = new LocalPageableTreeTableData();
        this.localPageableTreeTableData.pagingInfo.pageSize = 5;
        this.localPageableTreeTableData.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            treeField: 'field0',
            treeData: [
                {
                    label: "父节点1 - 展开",
                    open: true,
                    level: 1,
                    data: this.getRow(1),
                    nodes: [
                        {
                            label: "父节点11 - 折叠",
                            open: true,
                            level: 11,
                            data: this.getRow(11),
                            nodes: [
                                {label: "叶子节点111", level: 111, data: this.getRow(111)},
                                {label: "叶子节点112", level: 112, data: this.getRow(112)},
                                {label: "叶子节点113", level: 113, data: this.getRow(113)},
                                {label: "叶子节点114", level: 114, data: this.getRow(114)}
                            ]
                        },
                        {
                            label: "父节点12 - 折叠",
                            level: 12,
                            data: this.getRow(12),
                            nodes: [
                                {label: "叶子节点121", level: 121, data: this.getRow(121)},
                                {label: "叶子节点122", level: 122, data: this.getRow(122)},
                                {label: "叶子节点123", level: 123, data: this.getRow(123)},
                                {label: "叶子节点124", level: 124, data: this.getRow(124)}
                            ]
                        },
                        {
                            label: "父节点13 - 没有子节点",
                            level: 13,
                            data: this.getRow(13),
                            isParent: true
                        }
                    ]
                },
                {
                    label: "父节点2 - 折叠",
                    open: true,
                    level: 2,
                    data: this.getRow(2),
                    nodes: [
                        {
                            label: "父节点21 - 展开",
                            open: true,
                            level: 21,
                            data: this.getRow(21),
                            nodes: [
                                {label: "叶子节点211", level: 211, data: this.getRow(211)},
                                {label: "叶子节点212", level: 212, data: this.getRow(212)},
                                {label: "叶子节点213", level: 213, data: this.getRow(213)},
                                {label: "叶子节点214", level: 214, data: this.getRow(214)}
                            ]
                        },
                        {
                            label: "父节点22 - 折叠",
                            level: 22,
                            data: this.getRow(22),
                            nodes: [
                                {label: "叶子节点221", level: 221, data: this.getRow(221)},
                                {label: "叶子节点222", level: 222, data: this.getRow(222)},
                                {label: "叶子节点223", level: 223, data: this.getRow(223)},
                                {label: "叶子节点224", level: 224, data: this.getRow(224)}
                            ]
                        },
                        {
                            label: "父节点23 - 折叠",
                            level: 23,
                            data: this.getRow(23),
                            nodes: [
                                {label: "叶子节点231", level: 231, data: this.getRow(231)},
                                {label: "叶子节点232", level: 232, data: this.getRow(232)},
                                {label: "叶子节点233", level: 233, data: this.getRow(233)},
                                {label: "叶子节点234", level: 234, data: this.getRow(234)}
                            ]
                        }
                    ]
                },
                {label: "父节点3 - 没有子节点", isParent: true, level: 3, data: this.getRow(3)}
            ]
        });
    }

    columns: ColumnDefine[] = [
        {
            target: 'field0',
            cell: {
                renderer: TableCellTreeNodeRenderer
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}




