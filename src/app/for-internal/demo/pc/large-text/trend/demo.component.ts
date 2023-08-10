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
    trends = ['none' , 'percentage' , 'normal'];

    stringValue: string = "良";

    leadingUnit1: string = "天气情况：";


    valueMap: { [valueEnum: string]: [number, number] } = null;
    valueMap1: { [valueEnum: string]: [number, number] } = null;

    valueMapEntries = [];
    valueMapEntries1 = [];

    _$changeValue() {
        this.value += Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 1000) + 1;
    }

    valueMapUsed: boolean = false;

    valueMapChecked(event:boolean) {
        this.valueMap = event ? {
            '特别差':[-1000, -1],'差': [0, 0.00001], '中': [0.00002, 500], '良': [501, 1000],'优': [1000, 2000]
        }: null
        this.valueMapEntries = event ? Object.entries(this.valueMap) : []

        this.valueMap1 = event?{
            'iconfont iconfont-e193':[-Number.MAX_VALUE, -1],'iconfont iconfont-ea39': [0, 300], 'iconfont iconfont-e877': [301, 500], 'iconfont iconfont-e901': [501, 1000],'iconfont iconfont-e015': [1000, Number.MAX_VALUE]
        }: null
        this.valueMapEntries1 = event ? Object.entries(this.valueMap1) : [];
    }

    _$changeValue3() {
        const valueArray = ["特别差", "差", "中", "良", "优"];
        const randomIndex = Math.floor(Math.random() * valueArray.length);
        this.stringValue = valueArray[randomIndex]
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的计算趋势的用法。';
    description: string = '';
}
