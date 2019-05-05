import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputNonGroupDemoComponent {
    inputValue: any;
    public _$dropdownData = ['隐藏/显示元素', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`j-auto-complete-input`组件的各个参数的效果以及推荐的用法';
    description: string = '';
}
