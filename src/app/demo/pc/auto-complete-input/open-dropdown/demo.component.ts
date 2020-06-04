import {Component, ViewChild} from '@angular/core';
import {DropDownValue, JigsawAutoCompleteInput} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputOpenDropdownDemoComponent {
    @ViewChild('input', {static: false})
    public autoInput: JigsawAutoCompleteInput;

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
    summary: string = '这个DEMO详细演示如何通过编程方式打开下拉提示列表的功能';
    description: string = '';
}
