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
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    public styleOptions: TableStyleOptions = {
        rowStyles: {},
        headerStyles: {},
        cellStyles: {}
    };

    public updateStyleOptions() {
        this._cleanStyleOptions();
        this.table.updateStyleOptions();
    }

    public removeStyleOptions() {
        this.styleOptions = {};
    }

    public resetStyleOptions() {
        this.styleOptions = {
            rowStyles: {
                backgroundFill: "#ffffff", // 行背景填充
                oddBackgroundFill: "#f6f6f6", // 奇数行背景填充
                evenBackgroundFill: "#ffffff", // 偶数行背景填充
                hoverBackgroundFill: "#e6e6e6", // 行悬浮背景填充
                selectedBackgroundFill: "#c6c6c6", // 行选中背景填充
                borderType: "all", // 行边框类型
                borderWidth: "5px", // 行边框宽度
                borderStyle: "solid", // 行边框样式
                borderColor: "green", // 行边框颜色
                borderRadius: "3px", // 行边框圆角
                boxShadow: "2px 2px 2px #888888", // 行阴影
                opacity: '80%', // 行透明度
                height: "50px", // 行高
                spacing: "8px", // 表格行间距
            },
            headerStyles: {
                height: "60px", // 表头高度
                backgroundFill: "cyan", // 表头背景填充s
                borderType: "all", // 行边框类型
                borderWidth: "5px", // 行边框宽度
                borderStyle: "solid", // 行边框样式
                borderColor: "green", // 行边框颜色
                dividerType: "none", // 表头分割线类型
                dividerWidth: "5px", // 表头分割线宽度
                dividerStyle: "solid", // 表头分割线样式
                dividerColor: "purple", // 表头分割线颜色
                textAlign: "center", // 表头文字对齐类型
                textWeight: "bold", // 表头文字粗细类型
                textColor: "#333333", // 表头文字颜色
                textSize: "16px", // 表头文字大小
                textStyle: "italic", // 表头文字样式
            },
            cellStyles: {
                textAlign: "right", // 表格文字对齐类型
                textWeight: "normal", // 表格文字粗细类型
                textColor: "#666666", // 表格文字颜色
                textSize: "14px", // 表格文字大小
                textStyle: "italic", // 表格文字样式
            },

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
