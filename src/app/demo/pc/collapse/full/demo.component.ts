import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {LineGraphData, PieGraphData} from "jigsaw/common/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CollapseFullComponent {
    tableData: TableData;
    public pieGraphDataByCol: PieGraphData;
    public lineGraphData: LineGraphData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.pieGraphDataByCol = new PieGraphData();
        this.pieGraphDataByCol.http = http;
        this.pieGraphDataByCol.fromAjax('mock-data/marketing');

        this.lineGraphData = new LineGraphData();
        this.lineGraphData.http = http;
        this.lineGraphData.fromAjax('mock-data/marketing');
    }

    goodsList = [
        {
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.',
            active: true
        },
        {
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了`JigsawCollapse`的效果';
    description: string = '';
    tags: string[] = [
        'JigsawCollapse', 'JigsawCollapsePane',
    ];
}

