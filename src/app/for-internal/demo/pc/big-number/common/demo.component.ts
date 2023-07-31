import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo-component.css']
})
export class BigNumberCommonDemoComponent {

    value: number = 100.11112211;


    fractionDigits: number = 3;

    useRawValue: boolean = false;

    leadingUnit: string = "$";

    unit: string = "亿";

    valueMap = {
        '特别差':[-Number.MAX_VALUE, -1],'差': [0, 3000], '中': [3001, 5000], '良': [5001, 10000],'优': [10000, Number.MAX_VALUE]
    }

    valueMap1 = {
        'iconfont iconfont-e193':[Number.MIN_VALUE, -1],'iconfont iconfont-ea39': [0, 3000], 'iconfont iconfont-e877': [3001, 5000], 'iconfont iconfont-e901': [5001, 10000],'iconfont iconfont-e015': [10000, Number.MAX_VALUE]
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
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-big-number的简单用法。';
    description: string = '';
}
