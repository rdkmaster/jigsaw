import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['../demo-component.css']
})
export class LargeTextTrendDemoComponent {

    value: number = 1001.11112211;

    useRawValue: boolean = false;

    fractionDigits: number = 3;

    enableAnimation: boolean = true;

    animationDuration: number = 2000;

    leadingUnit: string = "华为股票市值：";

    unit: string = "亿";

    trend:'none' | 'percentage' | 'normal' = 'normal';

    stringValue: string = "良";

    leadingUnit1: string = "天气情况：";


    valueMap: { [valueEnum: string]: [number, number] } = null;
    valueMap1: { [valueEnum: string]: [number, number] } = null;
    valueMap2: { [valueEnum: string]: [number, number] } = null;

    valueMapEntries = [];
    valueMapEntries1 = [];
    valueMapEntries2 =[];

    _$changeValue() {
        this.value += Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue2() {
        this.valueMap = {
            '特别差':[-10000, -1],'差': [0, 0.00001], '中': [0.00002, 5000], '良': [5001, 10000],'优': [10000, 100000]
        }
        this.valueMapEntries = Object.entries(this.valueMap)

        this.valueMap1 = {
            'iconfont iconfont-e193':[-Number.MAX_VALUE, -1],'iconfont iconfont-ea39': [0, 3000], 'iconfont iconfont-e877': [3001, 5000], 'iconfont iconfont-e901': [5001, 10000],'iconfont iconfont-e015': [10000, Number.MAX_VALUE]
        }
        this.valueMapEntries1 = Object.entries(this.valueMap1)

        this.valueMap2 = {
            '/app/for-internal/demo/pc/big-number/common/assets/Monday.png':[-Number.MAX_VALUE, -1],
            "/app/for-internal/demo/pc/big-number/common/assets/Tuesday.png": [0, 1000],
            "/app/for-internal/demo/pc/big-number/common/assets/Wednesday.png": [1001, 2000],
            '/app/for-internal/demo/pc/big-number/common/assets/Thursday.png': [2001, 3000],
            '/app/for-internal/demo/pc/big-number/common/assets/Friday.png': [3001, 4000],
            '/app/for-internal/demo/pc/big-number/common/assets/Saturday.png': [3001, 4000],
            '/app/for-internal/demo/pc/big-number/common/assets/Sunday.png': [4001, Number.MAX_VALUE]
        }
        this.valueMapEntries2 = Object.entries(this.valueMap2)
    }

    _$changeValue3() {
        const valueArray = ["特别差", "差", "中", "良", "优"];
        const randomIndex = Math.floor(Math.random() * valueArray.length);
        this.stringValue = valueArray[randomIndex]
    }

    _$changeValue4() {
       this.valueMap = null;
       this.valueMap1 = null;
       this.valueMap2 = null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的计算趋势的用法。';
    description: string = '';
}
