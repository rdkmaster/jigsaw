import { Component } from "@angular/core";
import { GroupOptionValue } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'numeric-input-prefix-suffix',
    templateUrl: './demo.component.html'
})
export class NumericInputPrefixSuffixDemoComponent extends AsyncDescription {
    public demoPath = "demo/numeric-input/prefix-suffix";
    public selectedSize = { size: "default" };

    public _$units = ['单位（GB）', '单位（MB）', '单位（KB）'];
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
}
