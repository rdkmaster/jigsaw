import {EventEmitter} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export type I18nKeyTranslations = { [i18nKey: string]: I18nKeyTranslations | string};
export type ComponentTranslations = { [compName: string]: I18nKeyTranslations };
export type LanguageTranslations = { en: ComponentTranslations, zh: ComponentTranslations };

// @dynamic
export class TranslateHelper {
    public static languageChangEvent = new EventEmitter<{ oldLang: string, curLang: string }>();

    private static _tempCache: LanguageTranslations = {en: {}, zh: {}};
    private static _translateService: TranslateService = null;

    static get translateService(): TranslateService {
        return this._translateService;
    }

    static set translateService(value: TranslateService) {
        this._translateService = value;
        this._translateService.setDefaultLang(this._translateService.getBrowserLang());
        this.languageChangEvent.subscribe(langInfo => this._translateService.use(langInfo.curLang));
        this.translateService.setTranslation('en', this._tempCache.en, true);
        this.translateService.setTranslation('zh', this._tempCache.zh, true);
    }

    public static changeLanguage(translateService: TranslateService, lang: string): void {
        const oldLang = translateService.currentLang;
        translateService.use(lang);
        this.languageChangEvent.emit({oldLang: oldLang, curLang: lang});
    }

    public static initI18n(compName: string, translations: {en: I18nKeyTranslations, zh: I18nKeyTranslations}): void {
        this._initI18nWithLang(compName, 'en', translations.en);
        this._initI18nWithLang(compName, 'zh', translations.zh);
    }

    private static _initializedComponents: {en: {[compName: string]: boolean}, zh: {[compName: string]: boolean} } = {en: {}, zh: {}};

    private static _initI18nWithLang(compName: string, lang: 'en' | 'zh', translations: I18nKeyTranslations): void {
        if (this._initializedComponents[lang][compName]) {
            return;
        }
        this._initializedComponents[lang][compName] = true;

        if (!this.translateService) {
            this._tempCache[lang][compName] = translations;
            return;
        }
        this.translateService.setTranslation(lang, {[compName]: translations}, true);
    }
}

