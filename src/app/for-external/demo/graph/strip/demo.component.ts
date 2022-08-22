import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StripColorGraphData, StripGraphData, StripSequenceGraphData } from "jigsaw/public_api";
import { GraphTextService } from "../demo.service";

@Component({
    selector: 'graph-strip',
    templateUrl: './demo.component.html'
})
export class GraphStripDemoComponent {
    constructor(public http: HttpClient, public doc: GraphTextService) {
        this.stripData = new StripGraphData();
        this.stripData.header = ["搜狐视频", "乐视视频", "土豆视频", "奇异PPS视频", "优酷视频", "腾讯视频"];
        this.stripData.data = [
            [80000, 80000, 80000, 80000, 80000, 80000],
            [1800, 6895, 7738, 23486, 28686, 75860]
        ];

        this.stripSequenceData = new StripSequenceGraphData();
        this.stripSequenceData.header = ["网页打开总时延", "网页首包总时延", "GET时延", "TCP至GET时延", "TCP无线建链时延", "TCP有线建链时延", "DNS至TCP时延", "DNS时延"];
        this.stripSequenceData.data = [
            [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
            [0, 0, 500, 360, 300, 150, 60, 8],
            [1688, 778, 200, 160, 117, 167, 138, 70]
        ];

        this.stripColorData = new StripColorGraphData();
        this.stripColorData.title = '各市得分排名';
        this.stripColorData.header = ["保定", "石家庄", "唐山", "秦皇岛", "邢台", "承德"];
        this.stripColorData.data = [30, 66, 71, 88, 93, 98];
    }

    stripData: StripGraphData;

    stripSequenceData: StripSequenceGraphData;

    stripColorData: StripColorGraphData;

    handleClick($event) {
        console.log($event);
    }
}

