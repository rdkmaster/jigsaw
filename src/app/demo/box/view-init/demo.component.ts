import {Component} from "@angular/core";
import {LineGraphData} from "../../../../jigsaw/core/data/graph-data";
import {JigsawBox} from "../../../../jigsaw/component/box/box";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxViewInitDemoComponent {
    lineBarData: LineGraphData;
    constructor() {
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
        JigsawBox.viewInit.subscribe(() => {
            let e = document.createEvent("Event");
            e.initEvent("resize", true, true);
            window.dispatchEvent(e);
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了在内容溢出后，j-box在滚动条方面的行为，以及如何添加自定义滚动条';
    description: string = '';
    tags: string[] = [
        'JigsawBox',
        'PerfectScrollbarDirective'
    ];
}


