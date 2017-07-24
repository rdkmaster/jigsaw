import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";

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
        </jigsaw-button><br><br>

        <h4>alert</h4><jigsaw-info-alert [initData]="infoInitData"></jigsaw-info-alert><br>
        <h4>range-time</h4><jigsaw-range-time></jigsaw-range-time><br>
        <h4>time</h4><jigsaw-time></jigsaw-time>
    `
})
export class I18nFullDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2,
                public translateService: TranslateService) {
        translateService.use(translateService.getBrowserLang());
    }

    infoInitData = {
        message: this.translateService.instant('alertText')
    };

    changeLang(lang: string) {
        TranslateHelper.changeLanguage(this.translateService, lang);
        this.infoInitData = {
            message: this.translateService.instant('alertText')
        };
    }
}

