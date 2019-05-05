import {Component} from '@angular/core';
import {DropDownValue} from "jigsaw/pc-components/input/auto-complete-input";

@Component({
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputGroupDemoComponent {
    inputValue: any;

    public _$dropdownData: string[] | DropDownValue[] = [{
        category: '事件与数据',
        items: ['发送事件到事件总线', '更新变量']
    }, {
        category: '动画',
        items: ['隐藏/显示元素', '滚动页面']
    }, {
        category: '弹出',
        items: ['对话框', '提醒', '警示', '等待弹出关闭']
    }, {
        category: '高级',
        items: ['自定义代码块']
    }];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`j-auto-complete-input`组件的各个参数的效果以及推荐的用法';
    description: string = '';
}
