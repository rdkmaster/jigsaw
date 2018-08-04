import {Component} from '@angular/core';
import {StripColorGraphData, StripGraphData, StripSequenceGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class StripGraphComponent {
    constructor(public http: HttpClient) {
        this.stripData = new StripGraphData();
        this.stripData.header = ["搜狐视频", "乐视视频", "土豆视频", "奇异PPS视频", "优酷视频", "腾讯视频"];
        this.stripData.data = [
            [80000, 80000, 80000, 80000, 80000, 80000],
            [1800, 6895, 7738, 23486, 28686, 75860]
        ];

        this.stripFromAjax = new StripGraphData();
        this.stripFromAjax.http = http;
        this.stripFromAjax.fromAjax({url: '/graph-data/strip-data', params: {type: 'video'}});

        this.stripSequenceData = new StripSequenceGraphData();
        this.stripSequenceData.header = ["网页打开总时延", "网页首包总时延", "GET时延", "TCP至GET时延", "TCP无线建链时延", "TCP有线建链时延", "DNS至TCP时延", "DNS时延"];
        this.stripSequenceData.data = [
            [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
            [0, 0, 500, 360, 300, 150, 60, 8],
            [1688, 778, 200, 160, 117, 167, 138, 70]
        ];

        this.stripSequenceFromAjax = new StripSequenceGraphData();
        this.stripSequenceFromAjax.http = http;
        this.stripSequenceFromAjax.fromAjax({url: '/graph-data/strip-data', params: {type: 'timeout'}});

        this.stripColorData = new StripColorGraphData();
        this.stripColorData.title = '各市得分排名';
        this.stripColorData.header = ["保定", "石家庄", "唐山", "秦皇岛", "邢台", "承德"];
        this.stripColorData.data = [30, 66, 71, 88, 93, 98];

        this.stripColorFromAjax = new StripColorGraphData();
        this.stripColorFromAjax.title = '各市得分排名';
        this.stripColorFromAjax.http = http;
        this.stripColorFromAjax.fromAjax({url: '/graph-data/strip-data', params: {type: 'color'}});
    }

    stripData: StripGraphData;
    stripFromAjax: StripGraphData;

    stripSequenceData: StripSequenceGraphData;
    stripSequenceFromAjax: StripSequenceGraphData;

    stripColorData: StripColorGraphData;
    stripColorFromAjax: StripColorGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用条形图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/graph-data/strip-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    if (req.params.get('type') == 'video') {
        return {
            "header": ["搜狐视频", "乐视视频", "土豆视频", "奇异PPS视频", "优酷视频", "腾讯视频"],
            "data": [
                [80000, 80000, 80000, 80000, 80000, 80000],
                [1800, 6895, 7738, 23486, 28686, 75860]
            ]
        };
    } else if (req.params.get('type') == 'timeout') {
        return {
            "header": ["网页打开总时延", "网页首包总时延", "GET时延", "TCP至GET时延", "TCP无线建链时延", "TCP有线建链时延", "DNS至TCP时延", "DNS时延"],
            "data": [
                [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
                [0, 0, 500, 360, 300, 150, 60, 8],
                [1688, 778, 200, 160, 117, 167, 138, 70]
            ]
        }
    } else if (req.params.get('type') == 'color') {
        return {
            "header": ["保定", "石家庄", "唐山", "秦皇岛", "邢台", "承德"],
            "data": [
                [30, 66, 71, 88, 93, 98]
            ]
        }
    }
}

/* 模拟请求代码 end */
