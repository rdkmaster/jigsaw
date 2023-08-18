import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class NumericInputShowBorderDemoComponent {
    showOption: boolean;
    showBorder: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    public _$units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public _$unitChange(event: any) {
        console.log('prefix-suffix selected: ', event);
    }

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
}
