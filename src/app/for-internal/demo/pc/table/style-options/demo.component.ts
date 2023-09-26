import {Component, OnInit, ViewChild} from "@angular/core";
import {JigsawTable, styleOptions, TableData} from "jigsaw/public_api";

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

    public styleOptions: styleOptions = {
        hostStyle: {},
        headerStyle: {},
        bodyStyle: {},
        bodyTrStyle: {},
        headerCellStyle: {},
        bodyCellStyle: {}
    };

    public updateStyleOptions() {
        this._cleanStyleOptions();
        this.table.updateStyleOptions();
    }

    public removeStyleOptions() {
        this.styleOptions = {
            hostStyle: {},
            headerStyle: {},
            headerCellStyle: {},
            bodyStyle: {},
            bodyTrStyle: {},
            bodyCellStyle: {}
        };
    }

    public resetStyleOptions() {
        this.styleOptions = {
            hostStyle: {
                // 这里存在一个重点，背景的渐变色是backgroundImage，必须要做区分
                backgroundColor: 'cyan',
                backgroundImage: 'url("app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                border: '5px solid red',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px hsla(0, 0%, 0%, 0.5)',
                opacity: '1',
                visibility: 'visible',
                display: 'block',
            },
            headerStyle: {
                height: '80px',
                backgroundColor: '#666',
                backgroundImage: '',
                backgroundSize: '',
                backgroundPosition: '',
                backgroundRepeat: '',
                borderBottom: '2px solid red',
                borderCollapse: 'separate',
                borderSpacing: '5px'
            },
            headerCellStyle: {
                borderWidth: '2px',
                borderStyle: 'dotted',
                borderColor: 'yellow',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'green'
            },
            bodyStyle: {
                backgroundColor: 'transparent',
                backgroundImage: '',
                backgroundSize: '',
                backgroundPosition: '',
                backgroundRepeat: '',
                borderCollapse: 'separate',
                borderSpacing: '5px',
            },
            bodyTrStyle: {
                // tr不支持配置图片，但是支持渐进色，不过为了保证覆盖，同意会使用background CSS属性
                background: 'transparent',
                oddBackground: 'lightgreen',
                evenBackground: 'transparent',
                hoverBackground: 'red',
                selectedBackground: 'green'
            },
            bodyCellStyle: {
                borderWidth: '2px',
                borderStyle: 'dotted',
                borderColor: 'yellow',
                borderRadius: '0px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'green',
            }
        };
    }

    private _cleanStyleOptions() {
        const cleanedStyleOptions: styleOptions = {};

        for (const key in this.styleOptions) {
            if (this.styleOptions.hasOwnProperty(key)) {
                const obj = this.styleOptions[key];
                cleanedStyleOptions[key] = this._cleanObject(obj);
            }
        }

        this.styleOptions = cleanedStyleOptions;
    }

    private _cleanObject(obj) {
        const cleanedObj = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (value !== undefined && value !== null && value !== '') {
                    cleanedObj[key] = value;
                }
            }
        }

        return cleanedObj;
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
