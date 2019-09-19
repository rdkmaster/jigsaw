import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class AutoCompleteInputBasicDemoComponent {
    inputValue: any;
    inputValue2: any = '事件';
    maxDropDownHeight: string = "100px";
    width = '30%';
    filterOnFocus: boolean = false;

    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块'];

    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }

    click() {
        alert('你输入的值是 ' + this.inputValue)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`j-auto-complete-input`组件的各个参数的效果以及推荐的用法';
    description: string = '';
}
