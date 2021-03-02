import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-auto-complete-input {
            margin-bottom: 10px;
        }
    `]
})
export class AutoCompleteInputUnitDemoComponent {
    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭'];
    public _$units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public _$prefix = ['http://', 'https://'];
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
        console.log('unit selected: ', event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
