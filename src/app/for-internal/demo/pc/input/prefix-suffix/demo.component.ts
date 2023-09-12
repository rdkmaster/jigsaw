import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";

@Component({
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
    public prifix1 = "上行流量";

    public changePrefix1() {
        this.prifix1 = "修改的值"
    }

    public prifix2 = ['单位（GB）', '单位（MB）', '单位（KB）'];

    public changePrefix2() {
        this.prifix2 = ['修改的值1', '修改的值2', '修改的值3'];
    }

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

    public _$blankSuffix = "";

    public _$unitChange(event: any) {
        console.log('prefix-suffix selected: ', event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
