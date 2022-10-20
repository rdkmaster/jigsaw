import {Component, ElementRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RadarGraphData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'graph-radar',
    templateUrl: './demo.component.html'
})
export class GraphRadarDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/radar";

    public radarData: RadarGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.radarData = new RadarGraphData();
        this.radarData.title = '基础雷达图';
        this.radarData.rowDescriptor = ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'];
        this.radarData.header = ["销售（sales）", "管理（Administration）", "信息技术（Information Techology）", "客服（Customer Support）", "研发（Development）", "市场（Marketing）"];
        this.radarData.data = [
            [4300, 10000, 28000, 35000, 50000, 19000],
            [5000, 14000, 28000, 31000, 42000, 21000],
            [6500, 16000, 30000, 38000, 52000, 25000]
        ];
    }
}
