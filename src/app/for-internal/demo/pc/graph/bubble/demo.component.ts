import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BubbleChartGraphData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class BubbleGraphComponent {
    constructor(public http: HttpClient) {
        this.scatterData = new BubbleChartGraphData();
        this.scatterData.title = '气泡图';
        this.scatterData.data =  [
            [
                {
                    label: "苹果",
                    value: 400,
                    itemStyle: {
                        borderWidth: 1,
                        color: {
                            type: 'radial', // 使用径向渐变
                            x: 0.5, // 渐变中心的 x 坐标，取值范围 0 - 1
                            y: 0.5, // 渐变中心的 y 坐标，取值范围 0 - 1
                            r: 0.5, // 渐变半径，取值范围 0 - 1
                            colorStops: [
                                {
                                    offset: 0, // 0% 处的颜色
                                    color: 'rgba(25, 211, 196, 0)', // 渐变色
                                },
                                {
                                    offset: 1, // 100% 处的颜色
                                    color: 'rgba(25, 211, 196, 0.46)', // 渐变色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    x: 185, y: 195
                },
                {
                    label: "橘子",
                    value: 400,
                    itemStyle: {
                        borderWidth: 1,
                        color: "orange"
                    },
                    x: 215, y: 195
                },
                {
                    label: "西瓜",
                    value: 400,
                    itemStyle: {
                        borderWidth: 1,
                        color: "rgba(25, 211, 196, 0.46)"
                    },
                    x: 210, y: 210
                },
                {
                    label: "香蕉",
                    value: 400,
                    itemStyle: {
                        borderWidth: 1,
                        color: "yellow"
                    },
                    x: 190, y: 210
                },
                {
                    label: "葡萄",
                    value: 400,
                    itemStyle: {
                        borderWidth: 1,
                        color: "purple"
                    },
                    x: 200, y: 200
                },
                // {
                //     label: "橘子1",
                //     value: 150,
                //     itemStyle: {
                //         borderWidth: 1,
                //         color: "orange"
                //     }
                // },
                // {
                //     label: "西瓜1",
                //     value: 110,
                //     itemStyle: {
                //         borderWidth: 1,
                //         color: "rgba(25, 211, 196, 0.46)"
                //     }
                // },
                // {
                //     label: "香蕉1",
                //     value: 420,
                //     itemStyle: {
                //         borderWidth: 1,
                //         color: "yellow"
                //     }
                // },
                // {
                //     label: "葡萄1",
                //     value: 500,
                //     itemStyle: {
                //         borderWidth: 1,
                //         color: "purple"
                //     }
                // }
            ]
        ];
    }

    scatterData: BubbleChartGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
