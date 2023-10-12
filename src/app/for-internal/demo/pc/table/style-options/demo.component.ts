import { Component, OnInit, ViewChild } from "@angular/core";
import { JigsawTable, TableStyleOptions, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css']
})
export class TableSetStyleDemoComponent implements OnInit {
    public tableData: TableData;

    @ViewChild('table')
    public table: JigsawTable;

    public imgUrl = 'url("app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png")';

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

    public styleOptions: TableStyleOptions = {
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
                background: 'cyan',
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                borderWidth: '5px',
                borderStyle: 'solid',
                borderColor: 'red',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px hsla(0, 0%, 0%, 0.5)',
                opacity: '1'
            },
            headerStyle: {
                height: '80px',
                background: '#666',
                backgroundSize: '',
                backgroundPosition: '',
                backgroundRepeat: '',
                borderBottomWidth: '2px',
                borderBottomColor:'red',
                borderBottomStyle:'solid',
                borderBottomLeftRadius: '1px',
                borderBottomRightRadius: '1px',
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
                background: 'transparent',
                backgroundSize: '',
                backgroundPosition: '',
                backgroundRepeat: '',
                borderCollapse: 'separate',
                borderSpacing: '5px',
            },
            bodyTrStyle: {
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
            },
            otherStyle: {
                visibility: 'visible',
                display: 'block',
            }
        };
    }

    private _cleanStyleOptions() {
        const cleanedStyleOptions: TableStyleOptions = {};

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
