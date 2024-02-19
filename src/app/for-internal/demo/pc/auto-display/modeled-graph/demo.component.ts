import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AutoDisplayData, JigsawAutoDisplay } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAutoDisplayModeledGraphDemoComponent implements OnInit {
    @ViewChild('autoDisplay')
    public autoDisplay: JigsawAutoDisplay

    public template = require('./../assets/graph-templates.json');
    public derivedTemplate = require('./../assets/graph-derived-configs.json');

    public data: AutoDisplayData[] = [];

    public modeledData = {
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
    }

    public tableData = {
        data: [["January", "Nanjing", "386.07", "527.18", "286.08"], ["January", "Shanghai", "239.62", "652.33", "615.39"], ["January", "Beijing", "392.24", "83.17", "184.22"], ["January", "Nanjing", "734.41", "507.27", "968.95"], ["January", "Shanghai", "259.71", "849.52", "609.12"], ["January", "Beijing", "785.27", "157.20", "204.03"], ["January", "Nanjing", "823.10", "191.44", "331.10"], ["January", "Shanghai", "928.05", "160.84", "319.72"], ["January", "Beijing", "912.51", "912.15", "784.64"], ["January", "Nanjing", "560.46", "117.51", "102.40"], ["February", "Nanjing", "600.66", "205.14", "264.38"], ["February", "Shanghai", "570.97", "277.39", "7.65"], ["February", "Beijing", "297.38", "627.24", "186.00"], ["February", "Nanjing", "1.34", "892.55", "745.39"], ["February", "Shanghai", "499.37", "734.58", "979.80"], ["February", "Beijing", "792.43", "713.52", "377.38"], ["February", "Nanjing", "844.28", "916.30", "172.60"], ["February", "Shanghai", "961.46", "275.33", "365.07"], ["February", "Beijing", "600.49", "115.29", "455.07"], ["February", "Nanjing", "946.30", "864.81", "43.22"], ["March", "Nanjing", "23.18", "293.56", "655.54"], ["March", "Shanghai", "774.82", "219.36", "253.74"], ["March", "Beijing", "740.54", "299.28", "483.18"], ["March", "Nanjing", "903.49", "207.27", "658.76"], ["March", "Shanghai", "162.71", "115.67", "189.49"], ["March", "Beijing", "501.63", "514.37", "976.29"], ["March", "Nanjing", "736.99", "661.66", "478.93"], ["March", "Shanghai", "321.13", "769.62", "468.05"], ["March", "Beijing", "441.86", "558.60", "21.43"], ["March", "Nanjing", "927.18", "553.67", "491.35"], ["April", "Nanjing", "957.95", "88.06", "461.68"], ["April", "Shanghai", "779.49", "237.83", "133.61"], ["April", "Beijing", "334.27", "663.06", "945.51"], ["April", "Nanjing", "540.91", "320.51", "9.43"], ["April", "Shanghai", "657.80", "176.55", "910.78"], ["April", "Beijing", "390.48", "217.01", "914.32"], ["April", "Nanjing", "447.76", "74.78", "663.27"], ["April", "Shanghai", "567.01", "124.42", "497.23"], ["April", "Beijing", "389.89", "299.30", "866.62"], ["April", "Nanjing", "488.06", "500.23", "665.18"], ["May", "Nanjing", "36.03", "466.21", "898.73"], ["May", "Shanghai", "885.25", "632.42", "850.98"], ["May", "Beijing", "875.97", "915.62", "758.36"], ["May", "Nanjing", "421.96", "307.66", "480.75"], ["May", "Shanghai", "425.81", "859.81", "486.42"], ["May", "Beijing", "519.48", "850.95", "785.63"], ["May", "Nanjing", "96.54", "859.53", "23.97"], ["May", "Shanghai", "749.90", "956.04", "504.77"], ["May", "Beijing", "521.22", "553.89", "38.54"], ["May", "Nanjing", "56.05", "167.76", "754.86"], ["June", "Nanjing", "507.53", "214.25", "333.65"], ["June", "Shanghai", "252.13", "628.16", "739.51"], ["June", "Beijing", "741.21", "593.30", "369.50"], ["June", "Nanjing", "41.38", "890.52", "286.08"], ["June", "Shanghai", "930.59", "882.81", "610.56"], ["June", "Beijing", "591.42", "275.19", "833.66"], ["June", "Nanjing", "903.78", "669.77", "449.42"], ["June", "Shanghai", "912.81", "675.43", "507.20"], ["June", "Beijing", "727.28", "186.87", "329.94"], ["June", "Nanjing", "906.28", "596.51", "493.21"], ["January", "Nanjing", "937.02", "312.74", "905.10"], ["January", "Shanghai", "964.81", "987.76", "178.20"], ["January", "Beijing", "14.41", "939.38", "189.30"], ["January", "Nanjing", "69.58", "501.00", "678.76"], ["January", "Shanghai", "755.31", "126.40", "48.35"], ["January", "Beijing", "922.33", "430.88", "248.28"], ["January", "Nanjing", "350.26", "304.21", "596.49"], ["January", "Shanghai", "105.79", "354.91", "89.63"], ["January", "Beijing", "517.00", "570.65", "439.39"], ["January", "Nanjing", "38.83", "277.79", "250.56"], ["February", "Nanjing", "32.25", "733.27", "360.64"], ["February", "Shanghai", "193.94", "464.36", "675.74"], ["February", "Beijing", "274.67", "962.15", "911.90"], ["February", "Nanjing", "188.11", "750.50", "867.15"], ["February", "Shanghai", "276.19", "716.48", "243.22"], ["February", "Beijing", "484.04", "697.49", "506.96"], ["February", "Nanjing", "993.74", "465.06", "555.41"], ["February", "Shanghai", "659.29", "641.66", "737.02"], ["February", "Beijing", "123.77", "448.44", "122.04"], ["February", "Nanjing", "222.90", "481.97", "414.84"], ["March", "Nanjing", "87.90", "286.56", "616.55"], ["March", "Shanghai", "872.68", "495.67", "537.07"], ["March", "Beijing", "842.38", "460.94", "806.54"], ["March", "Nanjing", "718.82", "512.87", "349.44"], ["March", "Shanghai", "352.17", "874.48", "93.46"], ["March", "Beijing", "403.58", "107.73", "9.64"], ["March", "Nanjing", "299.33", "325.07", "456.36"], ["March", "Shanghai", "239.82", "88.84", "347.58"], ["March", "Beijing", "387.88", "983.93", "95.56"], ["March", "Nanjing", "193.32", "569.20", "231.72"], ["April", "Nanjing", "267.73", "657.81", "145.74"], ["April", "Shanghai", "383.02", "244.48", "184.30"], ["April", "Beijing", "480.75", "690.77", "94.72"], ["April", "Nanjing", "402.79", "981.61", "638.83"], ["April", "Shanghai", "959.80", "890.91", "858.97"], ["April", "Beijing", "534.88", "51.88", "783.74"], ["April", "Nanjing", "870.24", "839.62", "88.06"], ["April", "Shanghai", "752.69", "356.15", "298.25"], ["April", "Beijing", "670.39", "274.71", "966.71"], ["April", "Nanjing", "411.67", "528.39", "325.33"]],
        header: ["Sales Month", "City", "R&D Spending", "Management Spending", "Sales Spending"],
        field: ["time", "city", "rd_spending", "management_spending", "sales_spending"]
    }

    public addModeledPieGraph(index) {
        const data: any = {
            renderAs: 'modeled-echarts',
            initData: {
                type: 'pie',
                template: index,
                data: this.modeledData.data,
                header: this.modeledData.header,
                field: this.modeledData.field,
                dimensionField: "vehicle_model",
                indicatorsField: ["sales", "management_spending"],
            },
        }
        this._getModeledPieGraph(data);
        this.data.push(data);
        this.autoDisplay.update();
    }

    public addModeledRectangulartGraph(index) {
        let indicatorsField = ["rd_spending"];
        if (index == 24) {
            indicatorsField = ["rd_spending", "management_spending"];
        } else if (index == 25) {
            indicatorsField = ["rd_spending", "management_spending", "sales_spending"];
        }
        const stack = index == 25 ? 'month' : "";
        const data: any = {
            renderAs: 'modeled-echarts',
            initData: {
                type: 'bar',
                template: index,
                data: this.tableData.data,
                header: this.tableData.header,
                field: this.tableData.field,
                axisField: "time",
                dimensionField: "city",
                indicatorsField: indicatorsField,
                stack: stack
            },
        }
        this._getModeledPieGraph(data);
        this.data.push(data);
        this.autoDisplay.update();
    }

    private _getModeledPieGraph(data) {
        const index = data.initData.template;
        data.initData.template = eval("(" + this.derivedTemplate[index].option + ")");
        console.log(data);
        return data;
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
        console.log(this.derivedTemplate);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
