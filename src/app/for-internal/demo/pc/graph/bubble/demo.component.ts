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
                   value: 1,
               },
               {
                   label: "橘子",
                   value: 50,
               },
               {
                   label: "西瓜",
                   value: 110,
               },
               {
                   label: "香蕉",
                   value: 220,
               },
               {
                   label: "葡萄",
                   value: 300,
               },
               {
                   label: "橘子1",
                   value: 150,
               },
               {
                   label: "西瓜1",
                   value: 110,
               },
               {
                   label: "香蕉1",
                   value: 420,
               },
               {
                   label: "葡萄1",
                   value: 500,
               }
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
