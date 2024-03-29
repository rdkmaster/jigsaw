import {Component, NgZone, OnInit, TemplateRef, ViewEncapsulation} from "@angular/core";
import {
    ArrayCollection,
    JigsawToast,
    DialogNoviceGuide,
    NoviceGuideType,
    PopupInfo,
    PopupService,
    SimpleTreeData,
    BubbleNoviceGuide,
    TableData,
    WizardNoviceGuide,
    noviceGuide, SteppedNoviceGuide
} from 'jigsaw/public_api';

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
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
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

    show(data) {
        const r = noviceGuide.show(data);
        console.log(r);
        if (r == 'all-shown') {
            JigsawToast.showInfo('该新手指引帮助内容已经显示过了，请重置状态后再试。');
        } else if (r == 'conflict') {
            JigsawToast.showError('已经有一个指引在显示了，无法同时显示多个指引。');
        } else if (r == 'showing') {
            JigsawToast.showInfo('新手指正常显示中。。。');
        } else if (r == 'too-many-interruptions') {
            JigsawToast.showInfo('短时间内已经打扰过多次啦，稍等再来。');
        } else if (r == 'not-all-steps-ready') {
            JigsawToast.showInfo('分步指引只要有一个notice找不到，就不显示所有notice。');
        }
    }

    showAll() {
        JigsawToast.showInfo('测试同时显示多个指引，在正常情况下只会有一个显示出来，且指引完成后，再次显示所有指引时，应该显示下一个指引。');
        console.log('show bubbleGuideData result:', noviceGuide.show(this.bubbleGuideData));
        console.log('show dialogGuideData result:', noviceGuide.show(this.dialogGuideData));
        console.log('show steppedGuideData result:', noviceGuide.show(this.steppedGuideData));
        console.log('show wizardGuideData result:', noviceGuide.show(this.wizardGuideData));
    }

    reset() {
        noviceGuide.reset();
    }

    clear() {
        noviceGuide.clear();
        this.showContent = false;
    }

    options() {
        noviceGuide.updateOptions({expire: 120 * 1000, duration: 60 * 1000, maxShowTimes: 2});
        JigsawToast.showInfo('已经设置了1分钟最大打扰2次，一个指引超出2分钟后会再次显示。');
    }

    bubbleGuideData: BubbleNoviceGuide = {
        type: NoviceGuideType.bubble,
        notices: [
            {
                version: 'v0.0.2',
                notice: '这是一个使用innerText（文本）的示例',
                innerText: '菜单6',
                selector: '#header-menu>li',
                position: 'bottom'
            },
            {
                notice: '这是一个使用selector的示例',
                selector: '.jigsaw-nav-menu-items>.jigsaw-nav-menu-item:nth-child(2)',
                position: "right"
            },
            {
                notice: '这是一个使用innerText（正则）的示例',
                innerText: /All Rights Reserved/,
                classes: 'footer copyright',
                position: "top"
            },
            {notice: '这是一个使用attribute的示例', tagName: 'div', id: "ad", position: 'left'},
            {
                notice: '这是指引使用了delay，应该晚一点才出现', tagName: 'i', position: "right",
                classes: 'jigsaw-nav-menu-toggle-button-arrow', delay: 1000, width: '250px'
            },
        ],
        version: 'v0.0.1'
    };

    dialogGuideData: DialogNoviceGuide = {
        type: NoviceGuideType.dialog,
        notices: [
            {
                notice: '这是一条对话框新手指引',
                title: '自定义标题',
                button: '自定义按钮文本',
                tagName: 'jigsaw-navigation-menu',
                classes: 'jigsaw-nav-menu-host',
                position: 'right'
            },
            {
                notice: '这是指引使用了delay，应该晚一点才出现', title: '自定义标题', button: '自定义按钮文本',
                tagName: 'ul', id: 'header-menu', position: 'bottom', delay: 1000
            },
            {notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', id: 'ad', position: 'left'},
            {
                notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', position: "top",
                innerText: /All Rights Reserved/, classes: 'footer copyright', width: '250px'
            }
        ],
        version: 'v0.0.1'
    };

    steppedGuideData: SteppedNoviceGuide = {
        type: NoviceGuideType.stepped,
        notices: [
            {
                notice: '这是一条对话框新手指引',
                title: '自定义标题',
                button: '自定义按钮文本',
                tagName: 'jigsaw-navigation-menu',
                classes: 'jigsaw-nav-menu-host',
                position: 'right'
            },
            {
                notice: '这是指引使用了delay，应该晚一点才出现', title: '自定义标题', button: '自定义按钮文本',
                tagName: 'ul', id: 'header-menu', position: 'bottom', delay: 1000
            },
            {notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本', tagName: 'div', id: 'ad', position: 'left'},
            {
                notice: '这是一条对话框新手指引', title: '自定义标题', button: '自定义按钮文本',
                tagName: 'div', classes: 'footer copyright', position: 'top', width: '250px'
            }
        ],
        version: 'v0.0.1'
    };

    steppedGuideData1: SteppedNoviceGuide = {
        type: NoviceGuideType.stepped,
        notices: [
            {
                notice: '这是一条不会显示的对话框新手指引', title: '自定义标题', button: '自定义按钮文本',
                tagName: 'ul', id: 'header-menu', position: 'bottom', delay: 1000
            },
            {notice: '这条对话框指引的selector无效，导致整个分步指引无法显示', button: '--', classes: 'a invalid class list', position: 'top'}
        ],
        version: 'v0.0.1'
    };

    wizardGuideData: WizardNoviceGuide = {
        type: NoviceGuideType.wizard,
        notices: [
            {notice: '这是一个操作向导<br>点击这里打开对话框', tagName: 'li', id: 'dialog-btn', position: 'bottom'},
            {
                notice: '点击这里选择这个选项',
                tagName: 'j-tile-option',
                classes: 'jigsaw-tile-option',
                attribute1: {name: 'title', value: '错误'},
                position: 'bottom'
            },
            {
                notice: '最后关闭对话框',
                tagName: 'jigsaw-button',
                classes: 'jigsaw-button-host jigsaw-button-color-primary jigsaw-button-icon-left',
                position: 'bottom'
            },
        ],
        version: 'v0.0.1'
    };

    ngOnInit() {
        noviceGuide.show(this.wizardGuideData);
    }

    showContent = false;
    dialogInfo: PopupInfo;

    popupDialog(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    buttonbar = new ArrayCollection([
        {label: "成功", id: 1, icon: 'iconfont iconfont-e142'},
        {label: "错误", id: 2, icon: 'iconfont iconfont-e132'},
        {label: "警告", id: 3, icon: 'iconfont iconfont-e1a5'},
        {label: "信息", id: 4, icon: 'iconfont iconfont-e22c'}
    ]);

    constructor(private popupService: PopupService, ngZone: NgZone) {
        noviceGuide.updateOptions({ngZone});
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
