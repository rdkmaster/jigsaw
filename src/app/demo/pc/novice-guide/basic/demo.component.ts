import { Component, OnInit, TemplateRef, ViewEncapsulation } from "@angular/core";
import { ArrayCollection, PopupInfo, PopupService, SimpleTreeData, TableData } from 'jigsaw/public_api';
import {
    JigsawNoviceGuide,
    MultipleNoviceGuide,
    NoviceGuideConfig,
    NoviceGuideNoticeType,
    NoviceGuideType,
    SingularNoviceGuide,
    WizardNoviceGuide
} from 'novice-guide/src/novice-guide';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class JigsawNoviceGuideBasicDemoComponent implements OnInit {
    public navData: SimpleTreeData = new SimpleTreeData();
    public tabBarData: Array<string>;
    public tableData: TableData;

    cityList = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    getPos() {
        const ele = document.querySelector("li#guide1");
        console.log(ele.getBoundingClientRect());
    }

    changeSize() {
        const ele = document.querySelector("li#guide1");
        (ele as HTMLElement).style.width = '80px';
    }

    deleteEle() {
        const ele = document.querySelector("li#guide1");
        ele.remove();
    }

    bubbleGuideData: SingularNoviceGuide = {
        type: NoviceGuideType.singular,
        data: [
            { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引', tagName: 'li', property1: { property: 'innerText', value: '菜单6' }, position: 'bottom' },
            { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引', tagName: 'div', classes: 'jigsaw-nav-menu-item-top', property1: { property: 'innerText', value: '标准图标2' }, position: "right" },
            { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引', tagName: 'div', classes: 'footer copyright', position: "top" },
            { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引', tagName: 'div', id: "ad", position: 'left' },
            { type: NoviceGuideNoticeType.bubble, notice: '这是收起按钮，可以收起菜单。', tagName: 'i', classes: 'jigsaw-nav-menu-toggle-button-arrow', position: "right" },
            { type: NoviceGuideNoticeType.bubble, notice: '这是一条对话框新手指引', title: '自定义标题', tagName: 'jigsaw-button-bar', classes: 'jigsaw-button-bar-host', position: 'bottom' },
        ],
        version: 'v0.0.1'
    }

    dialogGuideData: SingularNoviceGuide = {
        type: NoviceGuideType.singular,
        data: [
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'jigsaw-navigation-menu', classes: 'jigsaw-nav-menu-host', position: 'right' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'ul', id: 'header-menu', position: 'bottom' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', id: 'ad', position: 'left' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', classes: 'footer copyright', position: 'top' }
        ],
        version: 'v0.0.1'
    }

    multipleNoviceGuideData: MultipleNoviceGuide = {
        type: NoviceGuideType.multiple,
        data: [
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'jigsaw-navigation-menu', classes: 'jigsaw-nav-menu-host', position: 'right' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'ul', id: 'header-menu', position: 'bottom' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', id: 'ad', position: 'left' },
            { type: NoviceGuideNoticeType.dialog, notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', classes: 'footer copyright', position: 'top' }
        ],
        version: 'v0.0.1'
    }

    wizardNoviceGuideData: WizardNoviceGuide = {
        type: NoviceGuideType.wizard,
        data: [
            { type: NoviceGuideNoticeType.wizard, notice: '这是一条对话框新手指引', title: '自定义标题', tagName: 'li', id: 'dialog-btn', position: 'bottom' },
            { type: NoviceGuideNoticeType.wizard, notice: '这是一条对话框新手指引', title: '自定义标题', tagName: 'j-tile-option', classes: 'jigsaw-tile-option', property1: { property: 'title', value: '错误' }, position: 'bottom' },
            { type: NoviceGuideNoticeType.wizard, notice: '这是一条对话框新手指引', title: '自定义标题', tagName: 'jigsaw-button', classes: 'jigsaw-button-host jigsaw-button-color-primary jigsaw-button-icon-left', position: 'bottom' },
        ],
        version: 'v0.0.1'
    }

    noviceGuide = new JigsawNoviceGuide({localStorageItem: 'jigsaw.noviceGuide'});

    ngOnInit() {
        this.noviceGuide.show(this.bubbleGuideData);
    }

    dialogInfo: PopupInfo;

    popupDialog(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    buttonbar = new ArrayCollection([
        { label: "成功", id: 1, icon: 'iconfont iconfont-e142' },
        { label: "错误", id: 2, icon: 'iconfont iconfont-e132' },
        { label: "警告", id: 3, icon: 'iconfont iconfont-e1a5' },
        { label: "信息", id: 4, icon: 'iconfont iconfont-e22c' }
    ]);

    constructor(private popupService: PopupService) {
        const xmlData = `
            <node>
                <node label="标准图标1" icon="iconfont iconfont-e231" selected="true"></node>
                <node label="标准图标2" icon="iconfont iconfont-e261"></node>
                <node label="标准图标3" icon="iconfont iconfont-e2f6"></node>
                <node label="标准图标4" icon="iconfont iconfont-e2d4"></node>
                <node label="标准图标5" icon="iconfont iconfont-e17c"></node>
                <node label="标准图标6" icon="iconfont iconfont-e0d1"></node>
                <node label="标准图标7" icon="iconfont iconfont-e191"></node>
                <node label="标准图标8" icon="iconfont iconfont-e54a"></node>
                <node label="标准图标9" icon="iconfont iconfont-e212"></node>
                <node label="标准图标10" icon="iconfont iconfont-e367"></node>
            </node>
        `;
        this.navData.fromXML(xmlData);

        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4"];

        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Wintsers2",
                    "Accountant",
                    "$170,50",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$3,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,80",
                    "2011/04/25",
                    "Edinburgh",
                    "542111"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "84212"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tigesr Nixon1",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tigers Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
