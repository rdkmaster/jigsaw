import {Component} from '@angular/core';
import {SliderMark} from "jigsaw/component/slider/slider";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class SliderBasicDemoComponent {
    // demo1
    value1: number = 30;
    disabled: boolean = false;

    sliderChange(value) {
        console.info("当前值: " + value);
    }

    // demo2
    value2: number = 10;
    min = 1;
    max = 20;

    sliderChange2(value) {
        this.value2 = value;
    }

    // demo3
    value3;
    valueStep = 1;

    public sliderChange3(value) {
        this.value3 = value;
    }

    // demo4
    rangeValue = new ArrayCollection([30, 50, 60]);

    handleValueChange(value) {
        console.log("传递出来的对象:");
        console.log(value);
    }

    // demo5
    marks = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {
            value: 60, label: '60 ℃', style: {color: "red"}
        }
    ];

    // demo6
    value6 = 10;
    vertical = true;
    rangeValue2 = new ArrayCollection([10, 80]);
    marks2: SliderMark[] = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {value: 80, label: '80 ℃'}
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
