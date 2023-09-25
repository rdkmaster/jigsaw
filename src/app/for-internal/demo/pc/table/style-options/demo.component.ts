import {Component, OnInit, ViewChild} from "@angular/core";
import {JigsawTable, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css']
})
export class TableSetStyleDemoComponent implements OnInit {
    tableData: TableData;

    @ViewChild('table')
    public table: JigsawTable;

    constructor() {
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
                [
                    "Garrett Winters1",
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

    public styleOptions: any = {table: {}, header: {cell: {}}, body: {tr: {}, cell: {}}};

    public updateStyleOptions() {
        this._removeEmptyValues(this.styleOptions);
        this.table.updateStyleOptions();
    }

    public removeStyleOptions() {
        this.styleOptions = {table: {}, header: {cell: {}}, body: {tr: {}, cell: {}}};
    }

    public resetStyleOptions() {
        this.styleOptions = {
            table: {
                // 这里存在一个重点，背景的渐变色是backgroundImage，必须要做区分
                backgroundColor: 'cyan',
                backgroundImage: 'url("app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                border: '5px solid red',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px hsla(0, 0%, 0%, 0.5)',
                opacity: 1,
                visibility: 'visible',
                display: 'block',
                borderCollapse: 'separate',
                borderSpacing: '5px'
            },
            header: {
                height: '80px',
                backgroundColor: 'pink',
                backgroundImage: 'linear-gradient(to right, #ff3366, #ff99cc)',
                borderBottom: '2px solid red',
                cell: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    noPadding: true,
                }
            },
            body: {
                tr: {
                    normal: 'transparent',
                    odd: 'transparent',
                    even: 'transparent',
                    hover: 'red',
                    selected: 'green'
                },
                cell: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    noPadding: true,
                }
            }
        };
    }

    private _removeEmptyValues(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    // 递归调用，处理嵌套对象
                    this._removeEmptyValues(obj[key]);
                    // 如果嵌套对象已经为空，则删除该属性
                    if (Object.keys(obj[key]).length === 0) {
                        delete obj[key];
                    }
                } else if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
                    // 如果值是空字符串、undefined 或 null，则删除该属性
                    delete obj[key];
                }
            }
        }
    }

    ngOnInit() {
        this.resetStyleOptions();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
