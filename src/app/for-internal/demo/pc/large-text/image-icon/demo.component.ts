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

    leadingUnit: string = "天气状况：";

    trend:'none' | 'percentage' | 'normal' = 'normal';

    trends = ['none' , 'percentage' , 'normal'];

    valueMap2: { [valueEnum: string]: [number, number] } = null;

    valueMapEntries2 = [];

    _$changeValue() {
        this.value += Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 1000) + 1;
    }

    valueMapUsed: boolean = false;
    valueMapChecked(event) {
        this.valueMap2 = event ? {
            '/app/for-internal/demo/pc/large-text/image-icon/assets/Monday.png': [-Number.MAX_VALUE, -1],
            "/app/for-internal/demo/pc/large-text/image-icon/assets/Tuesday.png": [0, 1000],
            "/app/for-internal/demo/pc/large-text/image-icon/assets/Wednesday.png": [1001, 2000],
            '/app/for-internal/demo/pc/large-text/image-icon/assets/Thursday.png': [2001, 3000],
            '/app/for-internal/demo/pc/large-text/image-icon/assets/Friday.png': [3001, 4000],
            '/app/for-internal/demo/pc/large-text/image-icon/assets/Saturday.png': [3001, 4000],
            '/app/for-internal/demo/pc/large-text/image-icon/assets/Sunday.png': [4001, Number.MAX_VALUE]
        } : null;
        this.valueMapEntries2 = event ? Object.entries(this.valueMap2) : null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的计算趋势的用法。';
    description: string = '';
}
