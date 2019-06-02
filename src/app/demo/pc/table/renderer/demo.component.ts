import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/common/core/data/table-data";
import {
    AdditionalColumnDefine,
    AdditionalTableData,
    ColumnDefine,
    TableValueGenerators,
} from "jigsaw/pc-components/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";
import {
    filterData,
    OfficeCellEditorRenderer,
    OfficeCellRenderer,
    OfficeHeaderRenderer,
    PositionHeaderRenderer,
} from "./renderers";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    @ViewChild('operation', {static: false}) operationTemplate: TemplateRef<any>;

    message: string = 'change message goes here ...';
    tableData: LocalPageableTableData;
    additionalData: AdditionalTableData;

    constructor(public http: HttpClient) {
        this.tableData = new LocalPageableTableData();
        this.tableData.pagingInfo.pageSize = 50;
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list-full');
    }

    additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '50px',
            header: {
                text: '#',
            },
            cell: {
                data: TableValueGenerators.rowIndexGenerator,
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
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.operationTemplate,
                tooltip: '加薪：当前员工一次加2000\n辞退：立即辞退当前员工'
            }
        },
    ];

    columnDefines: ColumnDefine[] = [
        {
            target: ['position', 'a-not-exist-field'],
            width: '15%',
            header: {
                renderer: PositionHeaderRenderer,
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
                renderer: OfficeCellRenderer,
                editorRenderer: OfficeCellEditorRenderer,
                editable: true
            },
            header: {
                renderer: OfficeHeaderRenderer
            }
        },
        {
            target: ['name', 'salary', 'enroll-date'],
            width: '150', header: {sortable: true}
        },
        {
            target: 'desc',
            cell: {
                tooltip: TableValueGenerators.originCellDataGenerator,
                clazz: 'green-text'
            },
            width: '100'
        },
        {
            target: 'gender', visible: false
        },
    ];

    public onCellChange(value) {
        this.message = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    public payRaiseSelected() {
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
        this.additionalData.getAllTouched(1).forEach(item => {
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

    public fireSelected() {
        alert('未实现。。。')
    }

    public payRaise(employee) {
        this.tableData.data[employee][3] = Number(this.tableData.data[employee][3]) + 2000;
        // 这一步非常重要，我们直接修改了tableData的值，Jigsaw无法知道发生了啥变化，需要通过调用`refresh()`来通知Jigsaw
        this.tableData.refresh();
    }

    public fire(employee) {
        this.tableData.originalData.splice(employee, 1);
        this.tableData.data.splice(employee, 1);
        // 记住，但凡手工对Jigsaw的各种data做修改，都需要调用refresh()方法
        // 但是这里 changePage() 会自动调用 refresh() 方法，因此这里不需要再调用了
        this.tableData.changePage(this.tableData.pagingInfo.currentPage);
    }

    public onSearch(key: string) {
        // 可能你会注意到用户每敲一次键盘，就会调用一次filter。请放心，Jigsaw在有网络IO的场景，都做了debounce处理了
        // 因此不会出现大量的filter请求出去的。
        // 注意对于LocalPageableTableData，Jigsaw没有做debounce
        filterData(this.tableData, {allFields: key});
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了表格的列定义模式的多个用法，包括列渲染器、列宽调整、列的宽文本控制，列tooltip等。';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawTable',
        'ColumnDefine.header',
        'ColumnDefine.cell',
        'TableHeader',
        'TableCell',
        'TableCell.tooltip',
        'TableValueGenerators.originCellDataGenerator',
        'ColumnDefine.target',
        'ColumnDefine.width',
    ];
}

