import {Component} from '@angular/core';
import {AutoCompleteInputTextService} from "../doc.service";

@Component({
    selector: 'auto-complete-input-basic',
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputBasicDemoComponent {
    inputValue: any;
    filterOnFocus: boolean = false;
    closeDropDownOnSelect: boolean = true;
    public preIcons: string[] = ['iconfont iconfont-ea03', 'iconfont iconfont-ea2a'];
    public backIcon: string = 'iconfont iconfont-e9ee';
    public message: string = '';
    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块', '获取远程数据，判断数据是否是所需的数据结构，如果不是，将数据转换为所需的数据结构，再将数据赋给组件，呈现在界面上'];
    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }
    public iconClick(event: string, position: string) {
        console.log(event, position);
        this.message = `${position} icon "${event}" is clicked.`;
    }

    constructor(public doc: AutoCompleteInputTextService) {
    }
}
