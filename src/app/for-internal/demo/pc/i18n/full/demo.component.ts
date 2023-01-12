import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {
    TranslateHelper, ButtonInfo, LocalPageableTableData, ArrayCollection,
    TimeGr, TimeService, SimpleTreeData, TableData
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

        .dialog-container .iconfont {
            margin-right: 5px
        }

        .header {
            padding: 20px 0 10px
        }`]
})
export class I18nFullDemoComponent {
    pageable: LocalPageableTableData;
    tableData: TableData;
    alertButtonZh: string = '知道了';
    alertButtonEn: string = 'Gotcha';

    constructor(public translateService: TranslateService, http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
        this.tableData = new TableData(
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);

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
            selectPlaceholder: '请选择',
            groupName: '分组标题',
            textOption: '文本选项',
            disabledOption: '禁用选项'
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
            selectPlaceholder: 'Please Select',
            groupName: 'Group Name',
            textOption: 'Text Option',
            disabledOption: 'Disabled Option'
        }, true /* shouldMerge参数必须是true */);
        // 触发一次改变语言的动作。注意如果把设置国际化词条的动作移动到模块构造函数中去，
        // 则下面这行代码是不需要的。
        this.changeLang('zh');
        this._updateNavigationData();
    }

    infoInitData = {
        message: this.translateService.instant('alertText')
    };

    customizeAlertButtonLabel() {
        this.translateService.setTranslation('zh', {
            // 结构要和src/jigsaw/pc-components/alert/alert.ts里的一致
            alert: { button: {ok: this.alertButtonZh} }
        }, true);
        this.translateService.setTranslation('en', {
            // 结构要和src/jigsaw/pc-components/alert/alert.ts里的一致
            alert: { button: {ok: this.alertButtonEn} }
        }, true);
    }

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
        this._updateNavigationData();
        this._updateSelectData();
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

    private _updateNavigationData() {
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

    private _updateSelectData() {
        this.dataList = new ArrayCollection([
            {
                groupName: `${this.translateService.instant("groupName")}1`,
                data: [
                    { label: `${this.translateService.instant("textOption")}1` },
                    { label: `${this.translateService.instant("textOption")}2` },
                    { label: `${this.translateService.instant("textOption")}3` },
                    { label: `${this.translateService.instant("textOption")}4` },
                    { label: `${this.translateService.instant("textOption")}5` },
                    { label: `${this.translateService.instant("textOption")}6` }
                ]
            },
            {
                groupName: `${this.translateService.instant("groupName")}2`,
                data: [
                    { label: `${this.translateService.instant("disabledOption")}7`, disabled: true },
                    { label: `${this.translateService.instant("disabledOption")}8`, disabled: true },
                    { label: `${this.translateService.instant("textOption")}9` }
                ]
            },
            {
                groupName: `${this.translateService.instant("groupName")}3`,
                data: [
                    { label: `${this.translateService.instant("textOption")}10` },
                    { label: `${this.translateService.instant("textOption")}11` },
                    { label: `${this.translateService.instant("textOption")}12` }
                ]
            }
        ]);
    }

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }

    dataList = new ArrayCollection([
        {
            groupName: `${this.translateService.instant("groupName")}1`,
            data: [
                { label: `${this.translateService.instant("textOption")}1` },
                { label: `${this.translateService.instant("textOption")}2` },
                { label: `${this.translateService.instant("textOption")}3` },
                { label: `${this.translateService.instant("textOption")}4` },
                { label: `${this.translateService.instant("textOption")}5` },
                { label: `${this.translateService.instant("textOption")}6` }
            ]
        },
        {
            groupName: `${this.translateService.instant("groupName")}2`,
            data: [
                { label: `${this.translateService.instant("disabledOption")}7`, disabled: true },
                { label: `${this.translateService.instant("disabledOption")}8`, disabled: true },
                { label: `${this.translateService.instant("textOption")}9` }
            ]
        },
        {
            groupName: `${this.translateService.instant("groupName")}3`,
            data: [
                { label: `${this.translateService.instant("textOption")}10` },
                { label: `${this.translateService.instant("textOption")}11` },
                { label: `${this.translateService.instant("textOption")}12` }
            ]
        }
    ]);

    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab('new tab', content);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
