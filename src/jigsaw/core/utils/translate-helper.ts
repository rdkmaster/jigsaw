import {EventEmitter} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export class TranslateHelper {
    public static alert = { en: {}, zh: {} };
    public static time = {};

    public static languageChangEvent = new EventEmitter<{oldLang: string, curLang: string}>();

    public static changeLanguage(translateService: TranslateService, lang: string):void {
        const oldLang = translateService.currentLang;
        translateService.use(lang);
        TranslateHelper.languageChangEvent.emit({
            oldLang: oldLang, curLang: lang
        });
    }

    public static defineLocale(translateService: TranslateService, lang: string, translations: Object):void {

    }
}

