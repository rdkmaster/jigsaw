import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo-component.css']
})
export class BigNumberCommonDemoComponent {

    value: number = 100.11112211;

    value1: string = '特别差';


    fractionDigits: number = 3;

    useRawValue: boolean = false;

    leadingUnit: string = "$";

    unit: string = "亿";

    valueMap = {
        '特别差':[-10000, -1],'差': [0, 3000], '中': [3001, 5000], '良': [5001, 10000],'优': [10000, 100000]
    }

    valueMap1 = {
        'iconfont iconfont-e193':[-Number.MAX_VALUE, -1],'iconfont iconfont-ea39': [0, 3000], 'iconfont iconfont-e877': [3001, 5000], 'iconfont iconfont-e901': [5001, 10000],'iconfont iconfont-e015': [10000, Number.MAX_VALUE]
    }

    _$changeValue() {
        this.value += Math.floor(Math.random() * 10000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 10000) + 1;
    }

    _$changeValue2() {
        this.value = Number(this.value.toFixed(3));
    }

    _$changeValue3() {
        const valueArray = ["特别差", "差", "中", "良", "优"];
        const randomIndex = Math.floor(Math.random() * valueArray.length);
        this.value1 = valueArray[randomIndex];
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-big-number的简单用法。';
    description: string = '';
}
