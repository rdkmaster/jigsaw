import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModeledRectangularGraphData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class RectangularGraphDemoComponent {
    public rectangularGraphData: ModeledRectangularGraphData;

    constructor(public http: HttpClient) {
        this.rectangularGraphData = new ModeledRectangularGraphData();
        this.rectangularGraphData.data = [
            ["January", "Nanjing", "115.68"],
            ["January", "Shanghai", "608.00"],
            ["January", "Beijing", "70.02"],
            ["January", "Nanjing", "355.14"],
            ["January", "Shanghai", "694.53"],
            ["January", "Beijing", "235.41"],
            ["January", "Nanjing", "409.99"],
            ["January", "Shanghai", "495.87"],
            ["January", "Beijing", "972.02"],
            ["January", "Nanjing", "129.55"],
            ["February", "Nanjing", "446.71"],
            ["February", "Shanghai", "612.56"],
            ["February", "Beijing", "972.08"],
            ["February", "Nanjing", "148.53"],
            ["February", "Shanghai", "110.31"],
            ["February", "Beijing", "773.81"],
            ["February", "Nanjing", "548.24"],
            ["February", "Shanghai", "923.53"],
            ["February", "Beijing", "165.43"],
            ["February", "Nanjing", "72.80"],
            ["March", "Nanjing", "351.10"],
            ["March", "Shanghai", "979.78"],
            ["March", "Beijing", "931.23"],
            ["March", "Nanjing", "112.31"],
            ["March", "Shanghai", "686.67"],
            ["March", "Beijing", "435.14"],
            ["March", "Nanjing", "767.87"],
            ["March", "Shanghai", "594.32"],
            ["March", "Beijing", "255.47"],
            ["March", "Nanjing", "521.48"],
            ["April", "Nanjing", "401.27"],
            ["April", "Shanghai", "71.27"],
            ["April", "Beijing", "885.27"],
            ["April", "Nanjing", "316.03"],
            ["April", "Shanghai", "151.79"],
            ["April", "Beijing", "205.06"],
            ["April", "Nanjing", "916.09"],
            ["April", "Shanghai", "303.21"],
            ["April", "Beijing", "754.66"],
            ["April", "Nanjing", "274.61"],
            ["May", "Nanjing", "612.02"],
            ["May", "Shanghai", "985.26"],
            ["May", "Beijing", "590.04"],
            ["May", "Nanjing", "44.54"],
            ["May", "Shanghai", "51.11"],
            ["May", "Beijing", "350.48"],
            ["May", "Nanjing", "162.03"],
            ["May", "Shanghai", "776.87"],
            ["May", "Beijing", "302.25"],
            ["May", "Nanjing", "470.78"],
            ["June", "Nanjing", "481.01"],
            ["June", "Shanghai", "850.36"],
            ["June", "Beijing", "516.43"],
            ["June", "Nanjing", "167.12"],
            ["June", "Shanghai", "851.92"],
            ["June", "Beijing", "461.48"],
            ["June", "Nanjing", "549.01"],
            ["June", "Shanghai", "205.12"],
            ["June", "Beijing", "386.23"],
            ["June", "Nanjing", "279.92"],
            ["January", "Nanjing", "164.05"],
            ["January", "Shanghai", "986.70"],
            ["January", "Beijing", "472.35"],
            ["January", "Nanjing", "939.87"],
            ["January", "Shanghai", "686.13"],
            ["January", "Beijing", "937.38"],
            ["January", "Nanjing", "783.67"],
            ["January", "Shanghai", "62.02"],
            ["January", "Beijing", "188.91"],
            ["January", "Nanjing", "34.67"],
            ["February", "Nanjing", "727.15"],
            ["February", "Shanghai", "148.33"],
            ["February", "Beijing", "288.39"],
            ["February", "Nanjing", "961.23"],
            ["February", "Shanghai", "178.68"],
            ["February", "Beijing", "810.04"],
            ["February", "Nanjing", "180.64"],
            ["February", "Shanghai", "331.40"],
            ["February", "Beijing", "912.26"],
            ["February", "Nanjing", "268.26"],
            ["March", "Nanjing", "400.60"],
            ["March", "Shanghai", "911.55"],
            ["March", "Beijing", "583.63"],
            ["March", "Nanjing", "108.06"],
            ["March", "Shanghai", "571.05"],
            ["March", "Beijing", "174.45"],
            ["March", "Nanjing", "944.43"],
            ["March", "Shanghai", "989.20"],
            ["March", "Beijing", "913.66"],
            ["March", "Nanjing", "346.83"],
            ["April", "Nanjing", "353.70"],
            ["April", "Shanghai", "397.01"],
            ["April", "Beijing", "443.06"],
            ["April", "Nanjing", "604.45"],
            ["April", "Shanghai", "408.74"],
            ["April", "Beijing", "612.79"],
            ["April", "Nanjing", "843.55"],
            ["April", "Shanghai", "265.88"],
            ["April", "Beijing", "814.23"],
            ["April", "Nanjing", "909.38"]
        ];
        this.rectangularGraphData.header = [
            "Sales Month",
            "City",
            "R&D Spending"
        ];
        this.rectangularGraphData.field = [
            "time",
            "city",
            "rd_spending"
        ];

        this.rectangularGraphData.dimensionField = "city";
        // this.rectangularGraphData.legendSource = "kpi";
        this.rectangularGraphData.dimensions = [];
        // this.rectangularGraphData.yAxis2 = {
        //     "position": "right",
        //     "name": "Management Spending",
        //     "nameLocation": "end",
        //     "type": "value"
        // };
        // this.rectangularGraphData.yAxis1 = {
        //     "position": "left",
        //     "name": "R&D Spending",
        //     "nameLocation": "end",
        //     "type": "value"
        // };
        this.rectangularGraphData.xAxis = {
            "field": "time",
            "style": {
                "name": "",
                "nameLocation": "end",
                "type": "category"
            }
        };
        this.rectangularGraphData.indicators = [
            {
                "aggregateBy": "average",
                "field": "rd_spending",
                "name": "R&D Spending",
                "yAxisIndex": 0,
                "shade": "bar",
                "stack": ""
            }
        ];
        this.rectangularGraphData.template.option = {
            "color": [
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#3B69FF"
                        },
                        {
                            "offset": 1,
                            "color": "#5096EE"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#EF6F61"
                        },
                        {
                            "offset": 1,
                            "color": "#FF9C6D"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#71C032"
                        },
                        {
                            "offset": 1,
                            "color": "#51E5A5"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#FAAA55"
                        },
                        {
                            "offset": 1,
                            "color": "#FCD549"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#D142D9"
                        },
                        {
                            "offset": 1,
                            "color": "#F82979"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#26BFA5"
                        },
                        {
                            "offset": 1,
                            "color": "#31B7E8"
                        }
                    ],
                    "global": false
                },
                {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 1,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#816AFF"
                        },
                        {
                            "offset": 1,
                            "color": "#BA56E0"
                        }
                    ],
                    "global": false
                }
            ],
            "title": {
                "x": "center",
                "textStyle": {},
                "subtextStyle": {},
                "show": true,
                "text": "基础柱状图",
                "titleChecked": true,
                "textAlign": "auto",
                "textVerticalAlign": "auto",
                "left": "center"
            },
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "cross",
                    "crossStyle": {
                        "color": "#999"
                    }
                },
                "extraCssText": "z-index: 999",
                "showDelay": 0,
                "hideDelay": 0,
                "transitionDuration": 0
            },
            "legend": {
                "data": null,
                "show": true,
                "type": "scroll",
                "orient": "horizontal",
                "left": "center",
                "top": "25"
            },
            "xAxis": {
                "type": "category",
                "axisPointer": {
                    "type": "shadow"
                }
            },
            "yAxis": [
                {
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLabel": {
                        "formatter": "{value}"
                    }
                },
                {
                    "type": "value",
                    "axisLabel": {
                        "formatter": "{value}"
                    }
                }
            ],
            "dataZoom": [
                {
                    "type": "slider",
                    "show": false,
                    "start": 0,
                    "end": 100
                },
                {
                    "type": "inside",
                    "disabled": true,
                    "start": 0,
                    "end": 100
                },
                {
                    "type": "inside",
                    "disabled": true,
                    "start": 0,
                    "end": 100
                }
            ],
            "grid": {
                "bottom": 30,
                "show": false
            },
        };
        this.rectangularGraphData.refresh();
        console.log(this.rectangularGraphData);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用饼图';
    description: string = '';
}
