/**
 * Created by 10177553 on 2017/4/13.
 */
import {Component, OnInit} from '@angular/core';
import {SliderMark} from "jigsaw/component/slider/slider";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class SliderBasicDemoComponent implements OnInit {
    value1: number = 30;
    value: number = 10;
    disabled: boolean = false;

    min = 1;
    max = 20;

    valueStep = 1;

    rangeValue = new ArrayCollection([30, 50, 60]);

    handleValueChange(value) {
        console.log("传递出来的对象:");
        console.log(value);
    }

    marks = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {
            value: 60, label: '60 ℃', style: {color: "red"}
        }
    ];

    marks2: SliderMark[] = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {value: 80, label: '80 ℃'}
    ];

    sliderChange(value) {
        console.info("当前值: " + value);
    }

    value2;

    sliderChange2(value) {
        this.value2 = value;
    }

    value3;

    public sliderChange3(value) {
        this.value3 = value;
    }

    rangeValue2 = new ArrayCollection([10, 80]);

    ngOnInit() {
    }

    vertical = true;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
