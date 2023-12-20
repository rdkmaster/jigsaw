import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModeledFunnelGraphData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class FunnelGraphComponent {
    constructor(public http: HttpClient) {
        this.funnelData = new ModeledFunnelGraphData();
        this.funnelData.data = [
            ["Sagitar", "80", "899.48", "177.36", "902.11", "226.06", "608.18", "4", "0.66", "1.49", "6"],
            ["Focus", "60", "340.84", "948.05", "653.80", "118.46", "733.72", "196", "0.62", "0.28", "7"],
            ["Civic", "40", "736.70", "788.63", "907.83", "877.41", "894.30", "108", "0.28", "1.26", "1"]
        ];
        this.funnelData.header = [
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
        this.funnelData.field = [
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
        this.funnelData.series = [
            {
                dimensions: [
                    {
                        name: "Sagitar"
                    },
                    {
                        name: "Focus"
                    },
                    {
                        name: "Civic"
                    }
                ],
                usingAllDimensions: true,
                indicators: [
                    {
                        name: "Sales of Current Month",
                        field: "sales",
                        aggregateBy: "average",
                        index: 1
                    }
                ],
                name: "Sales of Current Month",
                dimensionField: "vehicle_model"
            }
        ];
        this.funnelData.template.option = {
            legend: {
                show: true,
                type: "scroll",
                orient: "vertical",
                left: "left"
            },
            title: {
                show: true,
                text: '漏斗图'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
        }
        this.funnelData.template.seriesItem = {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            }
        }
        this.funnelData.colorConfig = 'blue';
        this.funnelData.refresh();
    }

    public funnelData: ModeledFunnelGraphData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用漏斗图';
    description: string = '';
}
