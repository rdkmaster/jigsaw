import {Component} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {LineGraphData, LineGraphDataByRow} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../libs/app.interceptor";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-line',
    templateUrl: './demo.component.html'
})
export class GraphLineDemoComponent {
    lineBarData: LineGraphData;
    constructor(public http: HttpClient, public  text: GraphTextService) {
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
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用折线图';
    description: string = require('!!raw-loader!./readme.md').default;
}

