import {Component} from '@angular/core';
import {GroupOptionValue} from "jigsaw/public_api";
@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container {
            margin: 20px;
        }
        .demo-container jigsaw-auto-complete-input {
            margin-bottom: 10px;
        }
    `]
})

export class AutoCompleteInputShowBorderDemoComponent {
    inputValue: any;
    filterOnFocus: boolean = false;
    showBorder: boolean 
    public _$dropdownData = ['隐藏/显示元素', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`j-auto-complete-input`组件的各个参数的效果以及推荐的用法';
    description: string = '';
    public hosts = ['rdk.zte.com.cn', 'jigsaw-zte.gitee.io'];
    public pages = ['/jigsaw/index.html', '/awade/index.html', '/rdk/index.html'];
    public protocols = ['http://', 'https://'];
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

    public onChange(event: any) {
        console.log('prefix-suffix selected: ', event);
    }
}
