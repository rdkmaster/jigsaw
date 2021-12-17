import {Component} from "@angular/core";
import {
    ChartIconCustomPie,
    InternalUtils,
    JigsawTheme,
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

    options5: ChartIconCustomPie = {
        fill: JigsawTheme.getGraphTheme().color,
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
