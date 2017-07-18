/**
 * Created by 10177553 on 2017/4/13.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {JigsawSlider, SliderMark} from "jigsaw/component/slider/slider";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    template: `
        <h4>1. 基本滑动条,滑动事件变化. </h4>
        <jigsaw-switch [(checked)]="disabled" size="small"></jigsaw-switch>
        <jigsaw-slider [(value)]="value1" [disabled]="disabled" (change)="sliderChange($event)" min="10"></jigsaw-slider>
        <span> 取值: {{value1}}</span>
        <hr>
        <br>
        <h4>2. 设置了min和max的滑动条</h4>
        <jigsaw-slider style="margin: 20px 0; " [value]="value" [min]="min" [max]="max"
                    (change)="sliderChange2($event)"></jigsaw-slider> <span>取值: {{value2}}</span>
        <hr>
        <br>
        <h4>3. 改变step</h4>
        <jigsaw-slider [value]="valueStep" min="0" max="2" step="0.01" (change)="sliderChange3($event)"></jigsaw-slider>
        <span>取值: {{value3}}</span>

        <hr>
        <br>
        <h4>4. 双触点滑动条</h4>
        <jigsaw-slider [(value)]="rangeValue" (change)="handleValueChange($event)"></jigsaw-slider>

        <hr>
        <br>
        <h4>5. mark 节点.</h4>
        <jigsaw-slider [marks]="marks" [value]="50"></jigsaw-slider>

        <hr>
        <br>
        <h4>6. 垂直滑动条.</h4>
        <jigsaw-slider [value]="rangeValue2" [vertical]="vertical" class="vertical"
                    style="height: 240px; width: 60px;"></jigsaw-slider>

        <jigsaw-slider #slider [value]="120" [marks]="marks2" min="20" [vertical]="vertical"
                    class="vertical3"></jigsaw-slider>
    `,
    styleUrls: ['./basic.scss']
})
export class JigsawSliderDemoBasic implements OnInit {

    @ViewChild('slider') verticalSlider: JigsawSlider;

    constructor() {
    }

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
            value: 60, label: '60 ℃', style: { color: "red" }
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

    value2

     sliderChange2(value) {
        this.value2 = value;
    }

    value3

    public sliderChange3(value) {
        this.value3 = value;
    }

    rangeValue2 = new ArrayCollection([10, 80]);

    ngOnInit() {
    }

    vertical = true;

}
