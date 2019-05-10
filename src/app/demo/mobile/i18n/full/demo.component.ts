import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/common/core/utils/translate-helper";
import {ButtonInfo} from "jigsaw/common/service/popup.service";
import {LocalPageableTableData} from "../../../../../jigsaw/common/core/data/table-data";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";
import {TimeGr, TimeService} from "../../../../../jigsaw/common/service/time.service";

/**
 * 覆盖控件内部的国际化词条
 */
TranslateHelper.alert.zh = {
    button: {ok: '知道了'}
};
TranslateHelper.alert.en = {
    button: {ok: 'Gotcha'}
};

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .dialog-content {
            padding: 30px;
        }

        .dialog-content .fa {
            font-size: 36px;
            color: #41addc;
            margin-right: 10px;
            vertical-align: middle;
        }

        jigsaw-mobile-dialog .fa {
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
        }, true);
        translateService.setTranslation('en', {
            desc: 'A complete example shows how to use i18n with Jigsaw.',
            lang: 'The current language is <b>{{lang}}</b>',
            alertText: 'This is a great info alert!',
            dialogButtonConfirm: 'Confirm',
            dialogButtonCancel: 'Cancel',
            dialogTitle: 'Create Task',
            dialogContent: 'Create task success',
        }, true /* shouldMerge参数必须是true */);
        // 触发一次改变语言的动作。注意如果把设置国际化词条的动作移动到模块构造函数中去，
        // 则下面这行代码是不需要的。
        this.changeLang('zh');
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

    beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
    endDate = TimeService.getFormatDate('now', TimeGr.date);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'TranslateService.use',
        'TranslateService.getBrowserLang',
        'TranslateService.setTranslation',
        'TranslateService.instant',
        'TranslateHelper.changeLanguage',
    ];
}

