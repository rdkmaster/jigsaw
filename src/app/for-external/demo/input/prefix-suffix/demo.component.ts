import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";
import {InputTextService} from "../doc.service";

@Component({
    selector: 'input-prefix-suffix',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container {
            margin: 20px;
        }
        .demo-container jigsaw-input {
            margin-bottom: 10px;
        }
    `]
})
export class InputPrefixSuffixDemoComponent {
    public _$units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public _$prefix = ['上行流量', '下行流量'];
    public _$prefixIcons: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle'
        },
        {
            icon: 'iconfont iconfont-e12e',
            name: 'camera'
        },
        {
            icon: 'iconfont iconfont-e0bc',
            name: 'car'
        },
        {
            icon: 'iconfont iconfont-e565',
            name: 'book'
        }
    ];
    public _$icons: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e12e',
            name: 'camera',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e0bc',
            name: 'car',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            suffixIcon: 'iconfont iconfont-ea03'
        }
    ];

    public _$unitChange(event: any) {
        console.log('prefix-suffix selected: ', event);
    }
    constructor(public doc: InputTextService) {
    }
}
