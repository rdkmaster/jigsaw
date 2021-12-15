import {Component, ViewChild} from "@angular/core";
import {
    ChartIconBar,
    ChartIconCustomPie,
    ChartIconDonut,
    ChartIconLine,
    ChartIconPie,
    ChartType,
    JigsawChartIconDirective
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconBasicDemoComponent {
    data = '5,3,9,6,5,9,7,3,5,2';

    chartType = ChartType.bar;

    options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie = {
        fill: ["red", "green", "blue"],
        height: 50,
        width: 100
    };

    @ViewChild('chartIcon1', {read: JigsawChartIconDirective}) chartIcon1: JigsawChartIconDirective;

    changeData() {
        function getRandomArbitrary(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        }
        this.data = this.data.split(',').map(x => Number(x) + getRandomArbitrary(0, 5)).join(',');
        this.chartIcon1.refresh();
    }

    changeChartType($event){
        const type = $event[0];
        this.chartType = type;
        switch (type) {
            case 'pie':
                this.options = {
                    fill: function (_, i, all) {
                        let g = (i / all.length) * 255;
                        return "rgb(255, " + g + ", 0)"
                    },
                    radius: 48,
                };
                break;
            case 'donut':

                break;
            case 'line':
                this.options = {
                    height: 80,
                    width: 100
                };
                break;
            case 'bar':
                this.options = {
                    fill: ["red", "green", "blue"],
                    height: 50,
                    width: 100
                };
                break;
            case 'customPie':
                break;
        }
        setTimeout(() => {
            this.chartIcon1.refresh();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
