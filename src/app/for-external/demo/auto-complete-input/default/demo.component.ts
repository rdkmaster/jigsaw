import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'auto-complete-input-default',
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputDefaultDemoComponent extends AsyncDescription {
    public demoPath = "demo/auto-complete-input/default";

    public inputValue: any = '事件';
    public filterOnFocus: boolean = false;
    public closeDropDownOnSelect: boolean = true;
    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块', '获取远程数据，判断数据是否是所需的数据结构，如果不是，将数据转换为所需的数据结构，再将数据赋给组件，呈现在界面上'];
}
