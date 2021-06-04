import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {
    TranslateHelper, ButtonInfo, LocalPageableTableData, ArrayCollection,
    TimeGr, TimeService, SimpleTreeData
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .dialog-content {
            padding: 30px;
        }

        .dialog-content .iconfont {
            font-size: 36px;
            color: #41addc;
            margin-right: 10px;
            vertical-align: middle;
        }

        jigsaw-dialog .iconfont {
            margin-right: 5px
        }

        h4 {
            padding: 20px 0 10px
        }`]
})
export class I18nFullDemoComponent {
    pageable: LocalPageableTableData;
    constructor(public translateService: TranslateService, http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');

        translateService.use(translateService.getBrowserLang());

        // 增加自定义词条
        // 请注意，实际开发时，我们推荐把定义词条的代码移动到本组件的模块构造函数中去
        // 这样就不需要在定义了词条之后再触发一次改变语言的动作了
        // 我们这样做，纯粹是为了demo实现的方便而已，不建议效仿
        translateService.setTranslation('zh', {
            desc: '这是一个用于演示在Jigsaw如何使用国际化的完整例子。',
            lang: '当前语言是 <b>{{lang}}</b>',
            alertText: '这是一个非常棒的 info 提示框！',
            dialogButtonConfirm: '确认',
            dialogButtonCancel: '退出',
            dialogTitle: '创建任务',
            dialogContent: '创建任务成功',
            curWarn: '当前告警',
            warnStatic: '告警统计',
            exportSchedule: '定时导出',
            syncWarn: '告警同步',
            warnHint: '告警提示',
            warnHistory: '历史告警',
            warnQuery: '告警查询',
            selectPlaceholder: '请选择'
        }, true);
        translateService.setTranslation('en', {
            desc: 'A complete example shows how to use i18n with Jigsaw.',
            lang: 'The current language is <b>{{lang}}</b>',
            alertText: 'This is a great info alert!',
            dialogButtonConfirm: 'Confirm',
            dialogButtonCancel: 'Cancel',
            dialogTitle: 'Create Task',
            dialogContent: 'Create task success',
            curWarn: 'Current Warn',
            warnStatic: 'Warn Static',
            exportSchedule: 'Export Schedule',
            syncWarn: 'Warn Synchronize',
            warnHint: 'Warn Hint',
            warnHistory: 'Warn History',
            warnQuery: 'Warn Query',
            selectPlaceholder: 'Please Select'
        }, true /* shouldMerge参数必须是true */);
        // 触发一次改变语言的动作。注意如果把设置国际化词条的动作移动到模块构造函数中去，
        // 则下面这行代码是不需要的。
        this.changeLang('zh');
        this._updateNavigatonData();
    }

    infoInitData = {
        message: this.translateService.instant('alertText')
    };

    buttons: Array<ButtonInfo> = [
        {
            role: 'cancel',
            label: this.translateService.instant('dialogButtonCancel'),
            clazz: ''
        },
        {
            role: 'confirm',
            label: this.translateService.instant('dialogButtonConfirm'),
            clazz: '',
            type: 'primary'
        },
    ];

    changeLang(lang: string) {
        TranslateHelper.changeLanguage(this.translateService, lang);
        this._updateNavigatonData();
        this._updateSelectData(lang);
        this.infoInitData = {
            message: this.translateService.instant('alertText')
        };
        this.buttons = [
            {
                role: 'cancel',
                label: this.translateService.instant('dialogButtonCancel'),
                clazz: ''
            },
            {
                role: 'confirm',
                label: this.translateService.instant('dialogButtonConfirm'),
                clazz: '',
                type: 'primary'
            },
        ];
    }

    public navigationMenuData: SimpleTreeData = new SimpleTreeData();
    beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
    endDate = TimeService.getFormatDate('now', TimeGr.date);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);

    private _updateNavigatonData() {
        this.navigationMenuData.fromXML(`
            <node>
                <node label="${this.translateService.instant('curWarn')}" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                    <node label="${this.translateService.instant('warnStatic')}" selected="true" icon="iconfont iconfont-e2d8"></node>
                    <node label="${this.translateService.instant('exportSchedule')}"></node>
                    <node label="${this.translateService.instant('syncWarn')}" icon="iconfont iconfont-e601"></node>
                    <node label="${this.translateService.instant('warnHint')}"></node>
                </node>
                <node label="${this.translateService.instant('warnHistory')}" icon="iconfont iconfont-e5f7">
                    <node label="${this.translateService.instant('warnQuery')}"></node>
                </node>
            </node>
        `);
    }

    private _updateSelectData(lang) {
        if (lang === "zh") {
            this.dataList = new ArrayCollection([
                {
                    groupName: "分组标题1",
                    data: [
                        { label: "文本选项1文本选项1文本选项1文本选项1文本选项1" },
                        { label: "文本选项2" },
                        { label: "文本选项3" }
                    ]
                },
                {
                    groupName: "分组标题2",
                    data: [
                        { label: "禁用选项4", disabled: true },
                        { label: "禁用选项5", disabled: true },
                        { label: "文本选项6" }
                    ]
                },
                {
                    groupName: "分组标题3",
                    data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }]
                }
            ]);
        }

        if (lang === "en") {
            this.dataList = new ArrayCollection([
                {
                    groupName: "group name1",
                    data: [
                        { label: "text option1text option1text option1text option1text option1" },
                        { label: "text option2" },
                        { label: "text option3" }
                    ]
                },
                {
                    groupName: "group name2",
                    data: [
                        { label: "disabled option4", disabled: true },
                        { label: "disabled option5", disabled: true },
                        { label: "text option6" }
                    ]
                },
                {
                    groupName: "group name3",
                    data: [{ label: "text option7" }, { label: "text option8" }, { label: "text option9" }]
                }
            ]);
        }
    }

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }

    dataList = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        {
            groupName: "分组标题2",
            data: [
                { label: "禁用选项4", disabled: true },
                { label: "禁用选项5", disabled: true },
                { label: "文本选项6" }
            ]
        },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
