import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AutoDisplayData, JigsawAutoDisplay } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAutoDisplayBasicDemoComponent implements OnInit {
    @ViewChild('autoDisplay')
    public autoDisplay: JigsawAutoDisplay

    public tempalte = require('./../assets/graph-templates.json');

    public data: AutoDisplayData[] = [];

    public addTableData() {
        this.data.push({
            renderAs: 'table',
            initData: {
                data: [
                    ["Tiger Nixon1", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winslters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Wintsers2", "Accountant", "$170,50", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon3", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon3", "System Architect", "$3,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon3", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon1", "System Architect", "$320,80", "2011/04/25", "Edinburgh", "542111"],
                    ["Garrett Winters1", "Accountant", "$170,750", "2011/07/25", "Tokyo", "84212"],
                    ["Tiger Nixon2", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tigesr Nixon1", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,750", "2011/07/25", "Tokyo", "8422"],
                    ["Tigers Nixon2", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"]
                ],
                field: ["name", "position", "salary", "enroll-date", "office", "extn"],
                header: ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
            }
        })
        this.autoDisplay.update();
    }

    public addBarGraph() {
        this.data.push({
            renderAs: 'origin-echarts',
            initData: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            }
        })
        this.autoDisplay.update();
    }

    public addGaugeGraph() {
        this.data.push({
            renderAs: 'origin-echarts',
            initData: {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: { formatter: '{value}%' },
                        data: [{ value: 50, name: '完成率' }]
                    }
                ]
            }
        })
        this.autoDisplay.update();
    }

    public addPieGraph() {
        this.data.push({
            renderAs: 'origin-echarts',
            initData: {
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        })
        this.autoDisplay.update();
    }

    public addStackGraph() {
        this.data.push({
            renderAs: 'origin-echarts',
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
        })
        this.autoDisplay.update();
    }

    public addModeledPieGraph() {
        const data: any = {
            renderAs: 'modeled-echarts',
            initData: {
                type: 'pie',
                template: 'Dashboard',
                data: [
                    ["Sagitar", "31954", "899.48", "177.36", "902.11", "226.06", "608.18", "4", "0.66", "1.49", "6"],
                    ["Focus", "35384", "340.84", "948.05", "653.80", "118.46", "733.72", "196", "0.62", "0.28", "7"],
                    ["Civic", "21426", "736.70", "788.63", "907.83", "877.41", "894.30", "108", "0.28", "1.26", "1"],
                    ["Sagitar", "19371", "299.50", "370.96", "633.86", "864.26", "849.42", "31", "0.06", "1.25", "4"],
                    ["Focus", "21284", "493.49", "91.13", "754.91", "945.15", "932.82", "151", "0.80", "0.38", "4"],
                    ["Civic", "44932", "909.29", "837.55", "806.17", "661.52", "548.85", "134", "1.87", "0.79", "2"],
                    ["Sagitar", "13208", "806.94", "603.21", "477.66", "277.56", "171.22", "141", "0.08", "0.16", "4"],
                    ["Focus", "39270", "624.62", "494.69", "223.36", "722.37", "465.06", "163", "0.48", "0.23", "5"],
                    ["Civic", "43419", "43.18", "957.29", "883.61", "408.84", "637.25", "59", "1.79", "1.79", "1"],
                    ["Sagitar", "10892", "426.70", "212.12", "838.93", "170.50", "683.50", "171", "1.60", "1.11", "1"]
                ],
                header: [
                    "Vehicle Model",
                    "Sales of Current Month",
                    "R&D Spending",
                    "Management Spending",
                    "Sales Spending",
                    "Market Spending",
                    "CRM Spending",
                    "Real-time Average Speed",
                    "Real-time Fuel Consumption",
                    "Real-time Water Temperature",
                    "Real-time Rotation Speed"
                ],
                field: [
                    "vehicle_model",
                    "sales",
                    "rd_spending",
                    "management_spending",
                    "sales_spending",
                    "market_spending",
                    "custom_service_spending",
                    "real_time_average_speed",
                    "real_time_fuel_consumption",
                    "real_time_water_temperature",
                    "real_time_rotating_speed"
                ],
                series: [{
                    "dimensions": [
                        {
                            "name": "Sagitar"
                        },
                        {
                            "name": "Focus"
                        },
                        {
                            "name": "Civic"
                        }
                    ],
                    "usingAllDimensions": true,
                    "indicators": [
                        {
                            "name": "Sales of Current Month",
                            "field": "sales",
                            "aggregateBy": "average",
                            "index": 1
                        }
                    ],
                    "name": "Sales of Current Month",
                    "dimensionField": "vehicle_model",
                    // 这两个属性和数据无关但是对于饼图来说必须有，也可以后期加
                    "radius": [
                        0,
                        75
                    ],
                    "center": [
                        50,
                        55
                    ],
                }]
            },
        }
        this._getTempalteData(data);
        this.data.push(data);
        this.autoDisplay.update();
    }

    private _getTempalteData(data) {
        data.tempalteOption = JSON.stringify(this.tempalte[3].option);
        console.log(data);
    }

    public removeData(index: number) {
        this.data.splice(index, 1);
        this.autoDisplay.update();
    }

    public clearData() {
        this.data = [];
    }

    ngOnInit(): void {
        // this.addTableData();
        console.log(this.tempalte);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
