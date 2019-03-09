import {Component, ViewEncapsulation} from "@angular/core";
import {Indicator, ModeledRectangularGraphData} from "../jigsaw/core/data/modeled-graph-data";

@Component({
    selector: 'app-root',
    template: `
        <jigsaw-root>
            <div class="app-wrap">
                <a (click)="testBD()">test bar graph data</a>
                <router-outlet></router-outlet>
            </div>
        </jigsaw-root>
    `,
    styleUrls: ['./live-demo-wrapper.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public testBD() {

        const data = {
            field: ['time', 'city', 'kpi1', 'kpi2'],
            header: ['时间', '城市', '最高温度', '最低温度'],
            data: [
                ['一', '南京', '20', '10'],
                ['一', '上海', '22', '12'],
                ['一', '深圳', '30', '23'],
                ['二', '南京', '21', '9'],
                ['二', '上海', '20', '10'],
                ['二', '深圳', '28', '20'],
                ['三', '南京', '23', '11'],
                ['三', '上海', '23', '14'],
                ['三', '深圳', '32', '25'],
                ['四', '南京', '26', '15'],
                ['四', '上海', '25', '17'],
                ['四', '深圳', '32', '23'],
                ['五', '南京', '20', '10'],
                ['五', '上海', '28', '12'],
                ['五', '深圳', '21', '25'],
                ['六', '南京', '20', '15'],
                ['六', '上海', '28', '17'],
                ['六', '深圳', '23', '23'],
                ['日', '南京', '23', '12'],
                ['日', '上海', '32', '25'],
                ['日', '深圳', '32', '15'],
            ]
        };
        const bd = new ModeledRectangularGraphData(data.data, data.header, data.field);
        bd.seriesField = '城市';
        bd.xAxis = {
            field: 'time', style: {}
        };
        bd.yAxis1 = {};
        bd.yAxis2 = {};
        bd.dimensions = [{name: '南京'}];
        bd.usingAllDimensions = false;
        bd.indicators = [
            new Indicator('kpi1'), new Indicator('kpi2')
        ];
        bd.legend = {};
        bd.title = {};
        console.log(bd.options);
        console.log(JSON.stringify(bd.options, null, ''));
    }
}

