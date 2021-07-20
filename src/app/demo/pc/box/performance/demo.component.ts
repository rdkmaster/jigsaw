import {Component} from "@angular/core";
import {PieGraphData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxPerformanceDemoComponent {
    public pieGraphData: PieGraphData;

    constructor() {
        this.pieGraphData = new PieGraphData();
        this.pieGraphData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphData.data = [120, 220, 150, 320, 820];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了box的性能，超过366个box会堆栈溢出';
    description: string = '';
}
