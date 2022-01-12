import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { ArrayCollection, JigsawListLite, GroupOptionValue } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo.component.css'],
    encapsulation: ViewEncapsulation.None,
    host: { '[attr.data-theme]': 'theme' }
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

    _$cityList2 = new ArrayCollection([
        {label: "北京"},
        {label: "上海", disabled: true},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙", disabled: true},
        {label: "西安"}
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

    _$titles = [
        {
            title: 'Settings',
            subTitle: 'Ctrl+Alt+A',
            subMenu: false
        },
        {
            title: 'Print',
            subTitle: '',
            subMenu: true
        },
        {
            title: 'Save All',
            subTitle: 'Ctrl+S',
            subMenu: false
        },
        {
            title: 'Exit',
            subTitle: '',
            subMenu: true
        }
    ];

    _$goodsList: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        JigsawListLite.SEPARATOR, // 配置分隔线
        {
            icon: 'iconfont iconfont-e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            icon: 'iconfont iconfont-e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true // 配置不可点击
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            icon: 'iconfont iconfont-e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    _$goodsList2 = [
        {
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.',
            active: true
        },
        {
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    _$groupData = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    ngAfterViewInit() {
        console.log(document.querySelectorAll("ul.build-in-theme-cntr li"));
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台';
    description: string = '';
}