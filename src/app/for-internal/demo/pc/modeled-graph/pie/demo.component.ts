import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModeledPieGraphData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class PieGraphDemoComponent {
    public pieGraphData: ModeledPieGraphData;

    constructor(public http: HttpClient) {
        this.pieGraphData = new ModeledPieGraphData();
        this.pieGraphData.data = [
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
        ];
        this.pieGraphData.header = [
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
        ];
        this.pieGraphData.field = [
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
        ];
        this.pieGraphData.series = [
            {
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
                "radius": [
                    0,
                    75
                ],
                "center": [
                    50,
                    55
                ],
                "dimensionField": "vehicle_model"
            }
        ];
        this.pieGraphData.template.option = {
            "tooltip": {
                "trigger": "item",
                "formatter": "{a} <br/>{b} : {c} ({d}%)",
                "textStyle": {
                    "fontSize": 12
                },
                "padding": [
                    1,
                    6
                ],
                "showDelay": 0,
                "hideDelay": 0,
                "transitionDuration": 0
            },
            "legend": {
                "show": true,
                "type": "scroll",
                "orient": "vertical",
                "left": "left"
            },
            "title": {
                "show": true,
                "text": "Vehicle Sales and Expenditure Statistics",
                "titleChecked": true,
                "textAlign": "auto",
                "textVerticalAlign": "auto",
                "left": "center",
                "textStyle": {},
                "subtextStyle": {}
            },
            "grid": {}
        };
        this.pieGraphData.template.seriesItem = {
            "type": "pie",
            "data": null,
            "name": "",
            "radius": [
                "0%",
                "80%"
            ],
            "center": [
                "50%",
                "50%"
            ],
            "itemStyle": {
                "emphasis": {
                    "shadowBlur": 10,
                    "shadowOffsetX": 0,
                    "shadowColor": "rgba(0, 0, 0, 0.5)"
                }
            }
        };
        this.pieGraphData.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用饼图';
    description: string = '';
}
