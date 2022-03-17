import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { ArrayCollection, GraphData, GroupOptionValue, JigsawListLite, SimpleTreeData, TableData, JigsawInfoAlert, JigsawWarningAlert, JigsawConfirmAlert, TabBarData } from 'jigsaw/public_api';
import { HttpClient } from '@angular/common/http';

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
        { label: "北京", id: 0 }, { label: "上海", id: 2 }, { label: "南京", id: 3 },
        { label: "深圳", id: 4 }, { label: "长沙", id: 5 }, { label: "西安", id: 6 }
    ]);

    _$cityList2 = new ArrayCollection([
        { label: "北京" }, { label: "上海", disabled: true }, { label: "南京" },
        { label: "深圳" }, { label: "长沙", disabled: true }, { label: "西安" }
    ]);

    _$dropdownData = [
        { category: '事件与数据', items: ['发送事件到事件总线', '更新变量'] },
        { category: '动画', items: ['隐藏/显示元素', '滚动页面'] },
        { category: '弹出', items: ['对话框', '提醒', '警示', '等待弹出关闭'] },
        { category: '高级', items: ['自定义代码块'] }
    ];

    _$breadcrumbItems = [
        { id: 0, label: "Home", icon: "iconfont iconfont-e647" },
        { id: 1, label: "Digital", icon: "iconfont iconfont-e12e" },
        { id: 2, label: "List", icon: "iconfont iconfont-e526" },
        { id: 3, label: "Detail", icon: "iconfont iconfont-e385" }
    ];

    _$titles = [
        { title: 'Settings', subTitle: 'Ctrl+Alt+A', subMenu: false },
        { title: 'Print', subTitle: '', subMenu: true },
        { title: 'Save All', subTitle: 'Ctrl+S', subMenu: false },
        { title: 'Exit', subTitle: '', subMenu: true }
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

    _$navigationData = new SimpleTreeData();

    _$tableData;

    _$graphData;

    _$cascadeData: SimpleTreeData;

    _$tabbarData: TabBarData[];

    constructor(http: HttpClient) {
        this._$navigationData.fromXML(`
        <node>
            <node label="当前告警" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                <node label="告警监控" selected="true" icon="iconfont iconfont-e2d8"></node>
                <node label="告警统计"></node>
                <node label="定时导出" icon="iconfont iconfont-e601"></node>
                <node label="告警同步"></node>
                <node label="告警提示" icon="iconfont iconfont-e52a"></node>
            </node>
            <node label="历史告警" icon="iconfont iconfont-e5f7">
                <node label="告警查询"></node>
            </node>
            <node label="通知" icon="iconfont iconfont-e605">
                <node label="通知监控"></node>
            </node>
            <node label="告警设置" icon="iconfont iconfont-e36f"></node>
        </node>
    `);

        this._$tableData = new TableData(
            [
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);

        this._$graphData = new GraphData({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, extraCssText: 'z-index: 999' },
            grid: { top: 10, bottom: 20, right: 0, left: 48, show: false },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { type: 'value' },
            series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
        });

        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this._$cascadeData = data);

        this._$tabbarData = [
            {
                label: "Tab 1",
                icon: "iconfont iconfont-e105"
            },
            {
                label: "Tab 2",
                disabled: true
            },
            {
                html: `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`
            },
            {
                html: `<span>更多</span>`
            },
            {
                label: "Tab 5",
                hidden: true
            }
        ];
    }

    commonInfoAlert() {
        JigsawInfoAlert.show({ header: '标题', message: '描述信息' });
    }

    commonWarningAlert() {
        JigsawWarningAlert.show({ header: '标题', message: '描述信息' });
    }

    commonErrorAlert() {
        JigsawWarningAlert.show({ header: '标题', message: '描述信息' });
    }

    commonConfirmAlert() {
        JigsawConfirmAlert.show({ header: '标题', message: '描述信息' }, null, [{ label: 'alert.button.yes' }, { label: 'alert.button.no' }, { label: "不知道" }]);
    }

    navMenu: any;

    navClick(item) {
        item.ele.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    visClick(item) {
        item.vis = !item.vis;
        console.log(item.ele.closest('.list-li'))
        item.ele.closest('.list-li').style.display = item.vis ? 'flex' : 'none';
    }

    ngAfterViewInit() {
        const allHeaders = document.querySelectorAll(".jigsaw-header-level-2");
        const validHeaders = Array.from(allHeaders).filter((item, i) => {
            return i % 2 === 0;
        })
        setTimeout(() => {
            this.navMenu = validHeaders.map(item => {
                return { name: item['innerText'], ele: item, vis: true };
            }).sort((a, b) => {
                return a.name.localeCompare(b.name);
            })
        }, 1);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
