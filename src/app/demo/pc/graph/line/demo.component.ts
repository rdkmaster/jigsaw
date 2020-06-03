import {Component} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {LineGraphData, LineGraphDataByRow} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})
export class LineGraphComponent {
    lineBarData: LineGraphData;
    lineBarFromAjax: LineGraphData;
    lineBarByRow: LineGraphDataByRow;
    lineBarByRowFromAjax: LineGraphDataByRow;
    constructor(public http: HttpClient) {
        this.lineBarData = new LineGraphData();
        this.lineBarData.rowDescriptor = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        this.lineBarData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.lineBarData.data = [
            [120, 220, 150, 320, 820],
            [132, 182, 232, 332, 932],
            [101, 191, 201, 301, 901],
            [134, 234, 154, 334, 934],
            [90, 290, 190, 390, 1290],
            [230, 330, 330, 330, 1330],
            [210, 310, 410, 320, 1320]
        ];

        this.lineBarFromAjax = new LineGraphData();
        this.lineBarFromAjax.http = http;
        this.lineBarFromAjax.fromAjax({url: '/graph-data/line-data', params: {byCol: true}});


        this.lineBarByRow = new LineGraphDataByRow();
        this.lineBarByRow.rowDescriptor = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.lineBarByRow.header = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        this.lineBarByRow.data = [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410],
            [320, 332, 301, 334, 390, 330, 320],
            [820, 932, 901, 934, 1290, 1330, 1320]
        ];

        this.lineBarByRowFromAjax = new LineGraphDataByRow();
        this.lineBarByRowFromAjax.http = http;
        this.lineBarByRowFromAjax.fromAjax({url: '/graph-data/line-data', params: {byRow: true}});
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用折线图';
    description: string = require('!!raw-loader!./readme.md').default;
}

/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/graph-data/line-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    if(req.params.get('byCol')) {
        return {
            "rowDescriptor": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            "header": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            "data": [
                [120, 220, 150, 320, 820],
                [132, 182, 232, 332, 932],
                [101, 191, 201, 301, 901],
                [134, 234, 154, 334, 934],
                [90, 290, 190, 390, 1290],
                [230, 330, 330, 330, 1330],
                [210, 310, 410, 320, 1320]
            ]
        }
    }else if(req.params.get('byRow')) {
        return {
            "rowDescriptor": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            "header": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            "data": [
                [120, 132, 101, 134, 90, 230, 210],
                [220, 182, 191, 234, 290, 330, 310],
                [150, 232, 201, 154, 190, 330, 410],
                [320, 332, 301, 334, 390, 330, 320],
                [820, 932, 901, 934, 1290, 1330, 1320]
            ]
        }
    }

}

/* 模拟请求代码 end */
