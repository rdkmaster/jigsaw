import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BubbleChartGraphData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class BubbleGraphComponent {
    public orangeX: number = 215;
    public orangeY: number = 195;
    public orangeBorderWidth = 1;
    public staticData = [
        [
            {
                label: "西瓜",
                value: 399,
                labelConfig: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'red',
                },
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0, 128, 0, 0)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 128, 0, 0.46)'
                            },
                        ],
                        global: false,
                    },
                },
                x: 185, y: 195
            },
            {
                label: "橘子",
                value: 399,
                labelConfig: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                },
                itemStyle: {
                    borderWidth: this.orangeBorderWidth,
                    borderColor: 'rgba(0, 120, 215, 0.7)',
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 165, 0, 0)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 165, 0, 0.46)',
                            },
                        ],
                        global: false,
                    },
                },
                x: this.orangeX, y: this.orangeY
            },
            {
                label: "苹果",
                value: 399,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 0, 0, 0)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 0, 0, 0.46)',
                            },
                        ],
                        global: false,
                    },

                },
                x: 210, y: 210
            },
            {
                label: "香蕉",
                value: 399,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 255, 0, 0)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 0, 0.46)',
                            },
                        ],
                        global: false,
                    },
                },
                x: 190, y: 210
            },
            {
                label: "葡萄",
                value: 400,
                labelConfig: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'pink',
                },
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(128, 0, 128, 0)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(128, 0, 128, 0.46)',
                            },
                        ],
                        global: false,
                    },
                },
                x: 200, y: 200
            }
        ]
    ];
    public dynamicData = [
        [
            {
                label: "西瓜",
                value: 400,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0, 128, 0, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 128, 0, 0.46)'
                            },
                        ],
                        global: false,
                    }
                }
            },
            {
                label: "橘子",
                value: 300,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 165, 0, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 165, 0, 0.46)'
                            },
                        ],
                        global: false,
                    },
                }
            },
            {
                label: "苹果",
                value: 200,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 0, 0, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 0, 0, 0.46)'
                            },
                        ],
                        global: false,
                    },
                },
            },
            {
                label: "香蕉",
                value: 150,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(255, 255, 0, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 0, 0.46)'
                            },
                        ],
                        global: false,
                    },
                },
            },
            {
                label: "葡萄",
                value: 50,
                itemStyle: {
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(128, 0, 128, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(128, 0, 128, 0.46)'
                            },
                        ],
                        global: false
                    },
                }
            }
        ]
    ];
    constructor(public http: HttpClient) {
        this.staticBubbleData = new BubbleChartGraphData();
        this.staticBubbleData.title = '位置固定气泡图';
        this.staticBubbleData.data = this.staticData;
        this.staticBubbleData.emphasisConfig = {
            itemStyle: {
                borderWidth: 1,
                borderColor: 'black',
                shadowBlur: 5,
                shadowColor: "red",
                shadowOffsetX: 0,
                shadowOffsetY: 5
            },
        }

        this.dynamicBubbleData = new BubbleChartGraphData();
        this.dynamicBubbleData.title = "引力布局气泡图";
        this.dynamicBubbleData.data = this.dynamicData;
        this.dynamicBubbleData.emphasisConfig = {
            itemStyle: {
                borderWidth: 1,
                borderColor: 'red',
                shadowBlur: 5,
                shadowColor: "pink",
                shadowOffsetX: 0,
                shadowOffsetY: 5
            },
        }
    }

    staticBubbleData: BubbleChartGraphData;

    dynamicBubbleData: BubbleChartGraphData;

    maxBubble: number = 200;
    minBubble: number = 130;

    public dataConfigChange() {
        this.staticBubbleData = new BubbleChartGraphData();
        this.staticBubbleData.minSymbolSize = this.minBubble;
        this.staticBubbleData.symbolSize = this.maxBubble;
        this.staticData[0].find(item => {
            if (item.label == "橘子") {
                item.x = this.orangeX;
                item.y = this.orangeY;
                item.itemStyle.borderWidth = this.orangeBorderWidth;
            }
        })
        this.staticBubbleData.data = this.staticData;
    }

    public handleClick(event) {
        console.log(event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
