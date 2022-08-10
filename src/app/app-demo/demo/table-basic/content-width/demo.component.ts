import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {
    TableData,
    ColumnDefine,
    AdditionalTableData,
    AdditionalColumnDefine,
    TableHeadCheckboxRenderer,
    TableCellCheckboxRenderer
} from "jigsaw/public_api"
import {TableBasicTextService} from "../doc.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'table-basic-content-width',
    templateUrl: './demo.component.html'
})
export class TableBasicContentWidthDemoComponent {
    tableData: TableData;
    tableData2: TableData;
    additionalData: AdditionalTableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2,
                public text: TableBasicTextService,
                http: HttpClient) {
        this.tableData = new TableData(
            [
                ["2017-05-05 16:59:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 16:59:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 16:59:50", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 185298],
                ["2017-05-05 17:00:40", "S1-U", "4G", "152553611", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:01:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:02:40", "S1-U", "4G", "15255211", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:10:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:12:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:15:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:16:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:17:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 17:22:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:00:40", "S1-U", "4G", "152553611", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:01:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:02:40", "S1-U", "4G", "15255211", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:10:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:12:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:15:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:16:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:17:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 18:22:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:00:40", "S1-U", "4G", "152553611", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:01:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:02:40", "S1-U", "4G", "15255211", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:10:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:12:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:15:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:16:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:17:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 19:22:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:00:40", "S1-U", "4G", "152553611", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:01:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:02:40", "S1-U", "4G", "15255211", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:10:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:12:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:15:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:16:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:17:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698],
                ["2017-05-05 20:22:40", "S1-U", "4G", "152551111", "unknown", "CMNET.MNC000.MCC460.GPRS", 180698]

            ],
            [
                "time",
                "interface",
                "net",
                "ciid",
                "ciname",
                "apn",
                "duration"
            ],
            [
                "时间",
                "接口",
                "接入网",
                "小区ID",
                "小区名称",
                "APN",
                "持续时长(ms)  "
            ]);

        this.tableData2 = new TableData();
        this.tableData2.http = http;
        this.tableData2.dataReviser = (result => {
            result.header[0] = '很长的姓名很长的姓名很长的姓名很长的姓名很长的姓名。。。。。';
            return result;
        });
        this.tableData2.fromAjax('mock-data/hr-list');

        this.tableData2.onAjaxComplete(() => {
            setTimeout(() => {
                if (this.additionalData) console.log(this.additionalData.data);
            }, 1000)
        })
    }

    columnDefines: ColumnDefine[] = [
        {
            target: 'time',
            width: 150
        },
        {
            target: 'apn',
            width: 230
        }
    ];

    columnDefines2: ColumnDefine[] = [
        {
            target: 0,
            width: 'byContent'
        },
        {
            target: 1,
            width: 100
        }
    ];

    additionalColumns2: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 50,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
        }
    }];
}
