import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { ColorSelectConfirmDemoModule } from '../../color-select/confirm/demo.module';
import { ArrayCollection } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ThemeBuildInThemeDemoComponent implements AfterViewInit {
    lightTheme = "light";
    darkTheme = "dark";

    _$cityList = new ArrayCollection([
        { label: "北京", id: 0 },
        { label: "上海", id: 2 },
        { label: "南京", id: 3 },
        { label: "深圳", id: 4 },
        { label: "长沙", id: 5 },
        { label: "西安", id: 6 }
    ]);

    _$dropdownData = [{
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

    _$breadcrumbItems = [
        { id: 0, label: "Home", icon: "iconfont iconfont-e647" },
        { id: 1, label: "Digital", icon: "iconfont iconfont-e12e" },
        { id: 2, label: "List", icon: "iconfont iconfont-e526" },
        { id: 3, label: "Detail", icon: "iconfont iconfont-e385" }
    ];

    ngAfterViewInit() {
        console.log(document.querySelectorAll("ul.build-in-theme-cntr li"));
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台';
    description: string = '';
}
