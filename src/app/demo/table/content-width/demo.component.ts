import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";

@Component({
    templateUrl: './demo.component.html'
})
export class TableContentWidthDemoComponent {
    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用contentWidth控制表格的列宽。';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawTable.columnDefines',
        'JigsawTable.contentWidth',
        'ColumnDefine.target',
        'ColumnDefine.width',
    ];
}

