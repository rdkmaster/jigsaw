import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {PieGraphData, PieGraphDataByRow} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})
export class PieGraphDemoComponent {
    public pieGraphData: PieGraphData;
    public pieGraphDataFromAjax: PieGraphData;
    public pieGraphDataByRow: PieGraphDataByRow;
    public pieGraphDataByRowFromAjax: PieGraphDataByRow;

    constructor(public http: HttpClient) {
        this.pieGraphData = new PieGraphData();
        this.pieGraphData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphData.data = [120, 220, 150, 320, 820];

        this.pieGraphDataFromAjax = new PieGraphData();
        this.pieGraphDataFromAjax.http = http;
        this.pieGraphDataFromAjax.fromAjax({url: '/graph-data/pie-data', params: {byCol: true}});


        this.pieGraphDataByRow = new PieGraphDataByRow();
        this.pieGraphDataByRow.rowDescriptor = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphDataByRow.data = [
            [120],
            [220],
            [150],
            [320],
            [820]
        ];

        this.pieGraphDataByRowFromAjax = new PieGraphDataByRow();
        this.pieGraphDataByRowFromAjax.http = http;
        this.pieGraphDataByRowFromAjax.fromAjax({url: '/graph-data/pie-data', params: {byRow: true}});
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用饼图';
    description: string = require('!!raw-loader!./readme.md');
}

/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/graph-data/pie-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    if(req.params.get('byCol')) {
        return {
            "header": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            "data": [
                [120, 220, 150, 320, 820]
            ]
        }
    }else if(req.params.get('byRow')) {
        return {
            "rowDescriptor": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            "data": [
                [120],
                [220],
                [150],
                [320],
                [820]
            ]
        }
    }

}

/* 模拟请求代码 end */
