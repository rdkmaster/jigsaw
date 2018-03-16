/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PieGraphData, PieGraphDataByColumn, PieGraphDataByRow} from "jigsaw/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html'
})
export class PieGraphDemoComponent {
    public pieGraphData: PieGraphData;
    public pieGraphDataByCol: PieGraphDataByColumn;
    public pieGraphDataByRow: PieGraphDataByRow;

    constructor(http: HttpClient) {
        const s = [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
        ];
        this.pieGraphData = new PieGraphData('某站点用户访问来源', s);

        this.pieGraphDataByCol = new PieGraphDataByColumn();
        this.pieGraphDataByCol.http = http;
        this.pieGraphDataByCol.fromAjax('mock-data/marketing');

        this.pieGraphDataByRow = new PieGraphDataByRow();
        this.pieGraphDataByRow.http = http;
        this.pieGraphDataByRow.fromAjax('mock-data/marketing');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'PieGraphData',
        'PieGraphDataByColumn',
        'PieGraphDataByRow',
    ];
}
