import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    AdditionalColumnDefine,
    ColumnDefine,
    TableCellCheckboxRenderer,
    TableData,
    TableHeadCheckboxRenderer,
    TableValueGenerators
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-align-content',
    templateUrl: './demo.component.html'
})
export class TableAlignContentDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/align-content";

    tableData: TableData;

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

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
    }
}
