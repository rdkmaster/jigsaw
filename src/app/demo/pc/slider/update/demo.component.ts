import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SliderUpdateDemoComponent {
    rangeMax = 100;

    rangeValue = new ArrayCollection([30, 50, 60]);

    rangeValueStr = '30-50-60';

    updateValue() {
        // max是绑定变量，赋值给组件会有延迟，所以后面刷新视图需要加延迟
        this.rangeMax = 200;
        setTimeout(() => {
            this.rangeValue.set(2, 200);
            this.rangeValue.refresh();
        })
    }

    handleChange($event) {
        this.rangeValueStr = this.rangeValue[0] + '-' + this.rangeValue[1] + '-' + this.rangeValue[2];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
