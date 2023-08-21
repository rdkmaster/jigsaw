import { Component, ViewEncapsulation, AfterViewInit, TemplateRef } from "@angular/core";
import {
    ArrayCollection, GraphData, GroupOptionValue, JigsawListLite, SimpleTreeData, TableData,
    JigsawInfoAlert, JigsawWarningAlert, JigsawConfirmAlert, TabBarData, LocalPageableTableData,
    PopupService, PopupInfo, TransferListSourceRenderer, TransferListDestRenderer, TransferTreeSourceRenderer,
    TransferTableSourceRenderer, JigsawToast, JigsawNotification, ColumnDefine, TableCellPasswordRenderer,
    TableCellTextEditorRenderer, TableCellAutoCompleteEditorRenderer, TableCellNumericEditorRenderer,
    TableCellSelectRenderer
} from 'jigsaw/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ThemeAllComponentDemoComponent {
    public disabled = false;

    public cityList = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    public selectedCity;

    public cityListText = ["北京", "上海", "南京", "深圳", "长沙", "西安"];

    public groupList = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "禁用选项4", disabled: true }, { label: "禁用选项5", disabled: true }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    public navData: SimpleTreeData = new SimpleTreeData();
    public treeData: SimpleTreeData = new SimpleTreeData();
    public treeData2: SimpleTreeData = new SimpleTreeData();
    public tableData: TableData;

    public stepData = [
        { title: "目的端配置(1/3)", status: "normal" },
        { title: "目的端配置(2/3)", status: "normal" },
        { title: "目的端配置(3/3)", status: "normal" }
    ];

    public goodsList: GroupOptionValue[] = [
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

    constructor() {
        this.navData.fromXML(`
            <node>
                <node label="当前告警" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                    <node label="告警监控" selected="true" icon="iconfont iconfont-e2d8"></node>
                    <node label="告警统计" disabled="true"></node>
                    <node label="定时导出" icon="iconfont iconfont-e601"></node>
                    <node label="告警同步"></node>
                    <node label="告警提示" icon="iconfont iconfont-e52a"></node>
                </node>
                <node label="历史告警" icon="iconfont iconfont-e5f7">
                    <node label="告警查询"></node>
                </node>
                <node label="通知" icon="iconfont iconfont-e605" disabled="true">
                    <node label="通知监控"></node>
                </node>
                <node label="告警设置" icon="iconfont iconfont-e36f"></node>
                <node label="其他设置" icon="iconfont iconfont-e810" disabled="true"></node>
            </node>
        `)

        this.treeData.fromObject([
            {
                label: "父节点1 - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
                        nodes: [{ label: "叶子节点111", chkDisabled: true }, { label: "叶子节点112" }, { label: "叶子节点113" }, { label: "叶子节点114" }]
                    },
                    {
                        label: "父节点12 - 折叠",
                        nodes: [{ label: "叶子节点121" }, { label: "叶子节点122" }, { label: "叶子节点123" }, { label: "叶子节点124" }]
                    },
                    { label: "父节点13 - 没有子节点", isParent: true }
                ]
            },
            {
                label: "父节点2 - 折叠",
                nodes: [
                    {
                        label: "父节点21 - 展开", open: true,
                        nodes: [{ label: "叶子节点211" }, { label: "叶子节点212" }, { label: "叶子节点213" }, { label: "叶子节点214" }]
                    },
                    {
                        label: "父节点22 - 折叠",
                        nodes: [{ label: "叶子节点221" }, { label: "叶子节点222" }, { label: "叶子节点223" }, { label: "叶子节点224" }]
                    },
                    {
                        label: "父节点23 - 折叠",
                        nodes: [{ label: "叶子节点231" }, { label: "叶子节点232" }, { label: "叶子节点233" }, { label: "叶子节点234" }]
                    }
                ]
            },
            { label: "父节点3 - 没有子节点", isParent: true }
        ]);

        this.treeData2.fromObject([{
            label: "this"
        }]);

        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                ["Garrett Winslters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
