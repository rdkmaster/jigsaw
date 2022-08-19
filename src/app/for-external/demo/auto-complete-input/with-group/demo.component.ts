import {Component} from '@angular/core';
import {DropDownValue} from "jigsaw/public_api";
import {AutoCompleteInputTextService} from "../doc.service";

@Component({
    selector: 'auto-complete-input-with-group',
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputGroupDemoComponent {
    inputValue: any;
    filterOnFocus: boolean = false;

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

    constructor(public doc: AutoCompleteInputTextService) {
    }
}
