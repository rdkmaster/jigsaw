import {Component} from "@angular/core";
import {
    ChartIconBar,
    ChartIconDonut,
    ChartIconLine,
    ChartIconPie,
    ChartIconCustomPie, InternalUtils,
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconBasicDemoComponent {
    constructor() {
        setInterval(() => {
            this.data = this.data.map(x => InternalUtils.randomNumber(0, 10));
        }, 1000);
    }

    data = [5, 3, 9, 6, 5, 9, 7, 3, 5, 2];

    options1: ChartIconPie = {
        fill: function (_, i, all) {
            let g = (i / all.length) * 255;
            return "rgb(255, " + g + ", 0)"
        },
        radius: 48,
    };

    options2: ChartIconDonut = {
        fill: ["red", "green", "blue"],
        height: 50,
        width: 100
    };

    options3: ChartIconLine = {
        height: 80,
        width: 100
    };

    options4: ChartIconBar = {
        fill: ["red", "green", "blue"],
        height: 50,
        width: 100
    };

    options5: ChartIconCustomPie = {
        fill: function (_, i, all) {
            let g = Math.round((i / all.length) * 255);
            return "rgb(100, " + g + ", 222)"
        },
        radius: 60,
        legend: {
            orient: 'right', // 如果是'top'，图例的高度是自动算出来的，所以height属性不需要配置
            width: 125,
            data: ['苹果', '华为', '小米', '中兴', '三星', 'oppo', 'vivo', '荣耀', '一加'],
            marginLeft: 5
        },
        series: {ggg: 111},
        link: this.handleLink,
        title: [],
        context: this,
        after: () => {
            console.log('a pie has been draw')
        },
    };

    handleLink(data, index) {
        console.log(this);
        console.log(index, data);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
