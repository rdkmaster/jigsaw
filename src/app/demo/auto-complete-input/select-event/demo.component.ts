import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputSelectEventDemoComponent {
    selectedItem: any;

    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块'];

    onSelect(item: string) {
        this.selectedItem = item;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '下拉提示内容被选中时，会发出`select`事件，此事件可用于区分用户手工输入的还是选择的';
    description: string = '';
}
