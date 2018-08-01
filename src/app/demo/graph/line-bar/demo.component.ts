import {Component} from "@angular/core";
import {LineBarGraphData, LineBarGraphDataByRow} from "jigsaw/core/data/graph-data";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {AjaxInterceptor} from "../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})

export class LineBarGraphComponent {
    lineBarData: LineBarGraphData;
    lineBarFromAjax: LineBarGraphData;
    lineBarByRow: LineBarGraphDataByRow;
    lineBarByRowFromAjax: LineBarGraphDataByRow;
    constructor(public http: HttpClient) {
        this.lineBarData = new LineBarGraphData();
        this.lineBarData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.lineBarData.data = [
            [120, 220, 150, 320, 820, '周一'],
            [132, 182, 232, 332, 932, '周二'],
            [101, 191, 201, 301, 901, '周三'],
            [134, 234, 154, 334, 934, '周四'],
            [90, 290, 190, 390, 1290, '周五'],
            [230, 330, 330, 330, 1330, '周六'],
            [210, 310, 410, 320, 1320, '周日']
        ];

        this.lineBarFromAjax = new LineBarGraphData();
        this.lineBarFromAjax.http = http;
        this.lineBarFromAjax.fromAjax({url: '/line-bar-data', params: {byCol: true}});


        this.lineBarByRow = new LineBarGraphDataByRow();
        this.lineBarByRow.data = [
            [120, 132, 101, 134, 90, 230, 210, '邮件营销'],
            [220, 182, 191, 234, 290, 330, 310, '联盟广告'],
            [150, 232, 201, 154, 190, 330, 410, '视频广告'],
            [320, 332, 301, 334, 390, 330, 320, '直接访问'],
            [820, 932, 901, 934, 1290, 1330, 1320, '搜索引擎']
        ];
        this.lineBarByRow.header = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

        this.lineBarByRowFromAjax = new LineBarGraphDataByRow();
        this.lineBarByRowFromAjax.http = http;
        this.lineBarByRowFromAjax.fromAjax({url: '/line-bar-data', params: {byRow: true}});
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/line-bar-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    if(req.params.get('byCol')) {
        return {
            "header": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            "data": [
                [120, 220, 150, 320, 820, '周一'],
                [132, 182, 232, 332, 932, '周二'],
                [101, 191, 201, 301, 901, '周三'],
                [134, 234, 154, 334, 934, '周四'],
                [90, 290, 190, 390, 1290, '周五'],
                [230, 330, 330, 330, 1330, '周六'],
                [210, 310, 410, 320, 1320, '周日']
            ]
        }
    }else if(req.params.get('byRow')) {
        return {
            "header": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            "data": [
                [120, 132, 101, 134, 90, 230, 210, '邮件营销'],
                [220, 182, 191, 234, 290, 330, 310, '联盟广告'],
                [150, 232, 201, 154, 190, 330, 410, '视频广告'],
                [320, 332, 301, 334, 390, 330, 320, '直接访问'],
                [820, 932, 901, 934, 1290, 1330, 1320, '搜索引擎']
            ]
        }
    }

}

/* 模拟请求代码 end */

