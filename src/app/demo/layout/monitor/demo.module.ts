import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawRootModule} from "jigsaw/component/root/root";
import {JigsawBoxModule} from "jigsaw/component/box/index";

import {MonitorComponent} from './demo.component';
import {TableMonitorComponent} from "./monitors/table.comp";
import {GraphMonitorComponent} from "./monitors/graph.comp";
import {NewMonitorComponent} from "./monitors/new-monitor.comp";
import {MonitorsModule} from "./monitors/monitors.module";
import {MonitorService} from "./monitors/monitor-service";
import {AjaxInterceptor} from "app/app.interceptor";
import {InternalUtils} from "../../../../jigsaw/core/utils/internal-utils";

@NgModule({
    declarations: [
        MonitorComponent
    ],
    imports: [
        CommonModule, TranslateModule.forRoot(),
        JigsawBoxModule, JigsawRadioModule, JigsawRootModule, MonitorsModule
    ],
    exports: [MonitorComponent],
    providers: [MonitorService],
    entryComponents: [TableMonitorComponent, GraphMonitorComponent, NewMonitorComponent]
})
export class MonitorModule {
}

// ============================================================================================================
// monitor mock data processors
// ============================================================================================================

let dashboards = [getBarChart, getLineChart, getBarChart];

AjaxInterceptor.registerProcessor('/monitor/statistics/indicators', req => {
    if (req.method == 'GET') {
        return [
            {
                "regionid": "001",
                "regionname": "全国",
                "series": [
                    {
                        "indicatorid": "11",
                        "indicatorname": "cpu总数",
                        "xAxisUnit": "天",
                        "yAxisUnit": "个"
                    },
                    {
                        "indicatorid": "22",
                        "indicatorname": "cpu使用率",
                        "xAxisUnit": "天",
                        "yAxisUnit": "%"
                    }
                ]
            },
            {
                "regionid": "002",
                "regionname": "河北",
                "series": [
                    {
                        "indicatorid": "33",
                        "indicatorname": "cpu总数",
                        "xAxisUnit": "天",
                        "yAxisUnit": "个"
                    },
                    {
                        "indicatorid": "44",
                        "indicatorname": "cpu使用率",
                        "xAxisUnit": "天",
                        "yAxisUnit": "%"
                    },
                    {
                        "indicatorid": "55",
                        "indicatorname": "磁盘使用率",
                        "xAxisUnit": "天",
                        "yAxisUnit": "%"
                    },
                ]
            }
        ];
    } else {
        dashboards.push(req.body.type == 'bar' ? getBarChart : getLineChart);
        return dashboards.length;
    }
});

function getBarChart() {
    return {
        chartID: 1,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name:'蒸发量',
                type:'bar',
                data:[InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250)]
            },
            {
                name:'降水量',
                type:'bar',
                data:[InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250), InternalUtils.randomNumber(1, 250)]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,
                data:[InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25), InternalUtils.randomNumber(0, 25)]
            }
        ]
    };
}

function getLineChart() {
    return {
        chartID: 1,
        title: {
            text: '堆叠区域图', x: 100, y: 20
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200)]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200)]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200)]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200)]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200), InternalUtils.randomNumber(100, 200)]
            }
        ]
    };
}

AjaxInterceptor.registerProcessor(/\/monitor\/statistics\/dashboard\/all.*/, req => {
    let data = [];
    dashboards.forEach((generator, idx) => {
        const d = generator();
        d.chartID = idx + 1;
        data.push(d);
    });
    return data;
});

AjaxInterceptor.registerProcessor(/\/monitor\/statistics\/dashboard.*/, req => {
    const idx = +req.params.get('chartID') - 1;
    dashboards.splice(idx, 1);
    return idx;
});

AjaxInterceptor.registerProcessor('/monitor/statistics/datatable', req => {
    let areas = ['河北', '河南', '广东', '江苏', '上海'];
    let trends = ['up', 'down', 'constant', "null"];
    let rows = InternalUtils.randomNumber(1, 40);
    let data = [];

    for (let i = 0; i < rows; i++) {
        data.push([
            {
                "name":"地区",
                "trend":"null",
                "dataOfToday":areas[InternalUtils.randomNumber(0, 4)],
                "dateOfTheDayBefore":"",
                "dateOfYesterday":""
            },
            {
                "name":"等待任务数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"就绪任务数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday": InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore": InternalUtils.randomNumber(10, 100),
                "dateOfYesterday": InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"异常任务数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"已完成任务数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"任务总数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"任务上牌数",
                "trend":trends[InternalUtils.randomNumber(0, 3)],
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"cpu总数",
                "trend":"null",
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"cpu使用率",
                "trend":"null",
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"内存使用率",
                "trend":"null",
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"内纯使用率",
                "trend":"null",
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            },
            {
                "name":"清洗后数据量",
                "trend":"null",
                "dataOfToday":InternalUtils.randomNumber(10, 100),
                "dateOfTheDayBefore":InternalUtils.randomNumber(10, 100),
                "dateOfYesterday":InternalUtils.randomNumber(10, 100)
            }
        ]);
    }
    return data;
});
