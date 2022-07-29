import {Component} from '@angular/core';
import {AutoCompleteInputTextService} from "../doc.service";

@Component({
    selector: 'auto-complete-input-default',
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputDefaultDemoComponent {
    inputValue: any = '事件';
    filterOnFocus: boolean = false;
    closeDropDownOnSelect: boolean = true;
    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块', '获取远程数据，判断数据是否是所需的数据结构，如果不是，将数据转换为所需的数据结构，再将数据赋给组件，呈现在界面上'];

    constructor(public text: AutoCompleteInputTextService) {
    }
}