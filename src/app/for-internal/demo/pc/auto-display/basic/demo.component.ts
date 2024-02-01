import { Component } from "@angular/core";
import { AutoDisplayGraphRenderer, AutoDisplayTableRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawAutoDisplayBasicDemoComponent {
    public data = [
        {
            renderAs: AutoDisplayGraphRenderer,
            initData: {
                title: {
                    text: '堆叠区域图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
                    top: 20,
                    left: 'center'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: { normal: {} },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        },
        {
            renderAs: 'table',
            initData: {
                data: [
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
                        "Garrett Wintsers2",
                        "Accountant",
                        "$170,50",
                        "2011/07/25",
                        "Tokyo",
                        "8422"
                    ],
                    [
                        "Tiger Nixon3",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Tiger Nixon3",
                        "System Architect",
                        "$3,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Tiger Nixon3",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Tiger Nixon1",
                        "System Architect",
                        "$320,80",
                        "2011/04/25",
                        "Edinburgh",
                        "542111"
                    ],
                    [
                        "Garrett Winters1",
                        "Accountant",
                        "$170,750",
                        "2011/07/25",
                        "Tokyo",
                        "84212"
                    ],
                    [
                        "Tiger Nixon2",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Tigesr Nixon1",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Garrett Winters1",
                        "Accountant",
                        "$170,750",
                        "2011/07/25",
                        "Tokyo",
                        "8422"
                    ],
                    [
                        "Tigers Nixon2",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ]
                ],
                field: ["name", "position", "salary", "enroll-date", "office", "extn"],
                header: ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
            }
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
