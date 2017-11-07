import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";
import {ButtonInfo} from "jigsaw/service/popup.service";
import {DemoBase} from "../../../demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
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

        jigsaw-dialog .fa {
            margin-right: 5px
        }

        h4 {
            padding: 20px 0 10px
        }`]
})
export class I18nFullDemoComponent extends DemoBase {
    constructor(public translateService: TranslateService) {
        super();
        translateService.use(translateService.getBrowserLang());
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
}

