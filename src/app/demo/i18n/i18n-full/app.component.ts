import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";
import {ButtonInfo} from "../../../../jigsaw/service/popup.service";

@Component({
    template: `
        <p style="padding-bottom: 12px">
            <span>{{'desc' | translate}}</span>
            <span [innerHtml]="'lang' | translate:  { lang: this.translateService.currentLang }"></span>
        </p>
        <jigsaw-button (click)="changeLang('en')">
            change language to English
        </jigsaw-button>
        <jigsaw-button (click)="changeLang('zh')">
            change language to Chinese
        </jigsaw-button><br>

        <h4>alert</h4><jigsaw-info-alert [initData]="infoInitData"></jigsaw-info-alert><br>
        <h4>dialog</h4>
        <jigsaw-dialog width="60%" [buttons]="buttons">
            <div jigsaw-title>
                <span class="fa fa-thumbs-up"></span>{{'dialogTitle' | translate}}
            </div>
            <div jigsaw-body>
                <div class="dialog-content">
                    <span class="fa fa-info-circle"></span> <span>{{'dialogContent' | translate}}</span>
                </div>
            </div>
        </jigsaw-dialog>
        <h4>range-time</h4><jigsaw-range-time></jigsaw-range-time><br>
        <h4>time</h4><jigsaw-time></jigsaw-time>
    `,
    styles: [`.dialog-content{padding: 30px;}
    .dialog-content .fa{font-size: 36px;color: #41addc;margin-right: 10px;vertical-align: middle;}
    jigsaw-dialog .fa{margin-right: 5px}
    h4{padding: 20px 0 10px}`]
})
export class I18nFullDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2,
                public translateService: TranslateService) {
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

