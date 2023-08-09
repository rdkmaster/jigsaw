import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['../demo-component.css']
})
export class LargeTextPictureDemoComponent {

    value: number = 1001.11112211;

    useRawValue: boolean = false;

    fractionDigits: number = 3;

    animationDuration: number = 2000;

    leadingUnit: string = "今天天气：";

    trend:'none' | 'percentage' | 'normal' = 'normal';

    valueMap2: { [valueEnum: string]: [number, number] } = null;

    valueMapEntries2 = [];

    _$changeValue() {
        this.value += Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue2() {
        this.valueMap2 = {
            '/app/for-internal/demo/pc/large-text/picture/assets/Monday.png':[-Number.MAX_VALUE, -1],
            "/app/for-internal/demo/pc/large-text/picture/assets/Tuesday.png": [0, 1000],
            "/app/for-internal/demo/pc/large-text/picture/assets/Wednesday.png": [1001, 2000],
            '/app/for-internal/demo/pc/large-text/picture/assets/Thursday.png': [2001, 3000],
            '/app/for-internal/demo/pc/large-text/picture/assets/Friday.png': [3001, 4000],
            '/app/for-internal/demo/pc/large-text/picture/assets/Saturday.png': [3001, 4000],
            '/app/for-internal/demo/pc/large-text/picture/assets/Sunday.png': [4001, Number.MAX_VALUE]
        }
        this.valueMapEntries2 = Object.entries(this.valueMap2)
    }

    _$changeValue4() {
        this.valueMap2 = null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的计算趋势的用法。';
    description: string = '';
}
