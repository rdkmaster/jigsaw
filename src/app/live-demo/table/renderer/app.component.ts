import {Component, ViewEncapsulation} from "@angular/core";
import {Http} from "@angular/http";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {
    AdditionalColumnDefine,
    AdditionalTableData,
    ColumnDefine, columnTooltipGenerator,
    rowIndexGenerator
} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {
    filterData, OfficeEditor, OfficeHeader, OfficeRenderer, PositionHeaderSelect,
    TableCellOperation
} from "./renderers";


@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    message: string = 'change message goes here ...';
    tableData: LocalPageableTableData;
    additionalData: AdditionalTableData;

    constructor(public http: Http) {
        this.tableData = new LocalPageableTableData();
        this.tableData.pagingInfo.pageSize = 200;
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    columnDefines: ColumnDefine[] = [
        {
            target: ['position', 'a-not-exist-field'],
            width: '15%',
            header: {
                renderer: PositionHeaderSelect,
                sortable: true
            },
            cell: {
                clazz: 'green-text'
            },
            group: true
        },
        {
            target: 'office', width: '180',
            cell: {
                renderer: OfficeRenderer,
                editorRenderer: OfficeEditor,
                editable: true
            },
            header: {
                renderer: OfficeHeader
            }
        },
        {
            target: ['name', 'salary', 'enrollDate'],
            width: '150', header: {sortable: true}
        },
        {
            target: 'desc',
            cell: {
                tooltip: columnTooltipGenerator,
                clazz: 'green-text'
            },
            width: '100'
        },
        {
            target: 'gender', visible: false
        },
    ];

    additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '50px',
            header: {
                text: '#',
            },
            cell: {
                data: rowIndexGenerator,
                clazz: 'green-text'
            }
        },
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer,
                data: (td, row, col) => td.data[row][2] == 'Developer',
            }
        },
        {
            //pos: -1, //不写pos表示插入到最后
            width: '100',
            header: {
                text: '操作',
                clazz: 'green-text'
            },
            cell: {
                renderer: TableCellOperation,
                tooltip: () => '加薪：当前员工一次加2000\n辞退：立即辞退当前员工'
            }
        },
    ];

    public onCellChange(value) {
        this.message = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    public payRaise() {
        // 我们这里来给勾选上的人加薪，注意勾选是的人有两部分，一部分是我们默认勾选上的，从前面代码看出，默认勾选上的都是Developer
        // 另外一部分是用户在界面上手工勾选的。因此这里需要将这两部分的人分开处理。
        // 考虑到这个demo用的是分页数据，因此如果要拿到所有的Developer，则必须专门去查询，我们不考虑这个情况
        // 因为这里主要为了演示如何获取其他页上的勾选值，只给当前页的Developer和单独勾选的人加薪。

        // 先处理默认勾上的人
        this.additionalData.data.forEach((row, index) => {
            if (row[1]) {
                this.tableData.data[index][3] = Number(this.tableData.data[index][3]) + 2000;
            }
        });

        // 再处理单独勾上的人
        this.additionalData.getTouchedValues(1).forEach(item => {
            const index = this.tableData.data.findIndex(row => row[0] === item.key);
            if (index == -1) {
                // 表示这个人不在本页，为了简单，我们也不管他了
                return;
            }
            if (!item.value) {
                // 表示用户在界面是勾掉了这个人
                return;
            }
            this.tableData.data[index][3] = Number(this.tableData.data[index][3]) + 2000;
        });

        // 这一步非常重要，我们直接修改了tableData的值，Jigsaw无法知道发生了啥变化，需要通过调用`refresh()`来通知Jigsaw
        this.tableData.refresh();
    }

    public fire() {
        alert('未实现。。。')
    }

    public onSearch(key: string) {
        // 可能你会注意到用户每敲一次键盘，就会调用一次filter。请放心，Jigsaw在有网络IO的场景，都做了debounce处理了
        // 因此不会出现大量的filter请求出去的。
        // 注意对于LocalPageableTableData，Jigsaw没有做debounce
        filterData(this.tableData, {allFields: key});
    }

    showDetail: boolean = false;
}

