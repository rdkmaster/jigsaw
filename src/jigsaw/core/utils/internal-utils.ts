import {TranslateService} from "@ngx-translate/core";
import {CommonUtils} from "./common-utils";
import {TranslateHelper} from "./translate-helper";

/**
 * @internal
 */
export class InternalUtils {
    public static uedSiteHost = 'http://rdk.zte.com.cn';

    public static _uniqueIdIndex = 0;
    public static _defaultPrefix = '__unique_id__';

    /*
     * 初始化对象标识，转化为数组
     * */
    public static initTrackItemBy(trackItemBy: string, labelField: string): string[] {
        if (!trackItemBy) {
            //标识没有输入值，采用显示属性名
            trackItemBy = labelField;
        }
        return trackItemBy.split(/\s*,\s*/g);
    }

    /*
     * 创建元素唯一ID
     *
     * */
    public static createUniqueId(prefix?: string) {
        this._uniqueIdIndex++;
        if (CommonUtils.isUndefined(prefix)) {
            prefix = this._defaultPrefix;
        }
        return prefix + this._uniqueIdIndex;
    };

    private static _initI18nWithLang(translateService: TranslateService, compName: string, translations: Object, lang: string): void {
        let curLangTransByApp: Object;
        const compTrans = TranslateHelper[compName];
        if (compTrans) {
            curLangTransByApp = compTrans[lang];
        }
        if (!curLangTransByApp) {
            curLangTransByApp = {};
        }

        let curLangTrans: Object = translations[lang];
        CommonUtils.extendObject(curLangTrans, curLangTransByApp);
        let resultTrans = {};
        resultTrans[compName] = curLangTrans;
        translateService.setTranslation(lang, resultTrans, true);
    }

    public static initI18n(translateService: TranslateService, compName: string, translations: Object): void {
        InternalUtils._initI18nWithLang(translateService, compName, translations, 'en');
        InternalUtils._initI18nWithLang(translateService, compName, translations, 'zh');
    }

    /**
     * 驼峰转短横线分隔命名
     * @param {string} prop
     * @returns {string}
     */
    public static camelToKebabCase(prop: string): string {
        return prop.match(/[A-Z]/g) ? prop.replace(/([A-Z])/g, '-$1') : prop;
    }

    /**
     * 短横线分隔转驼峰命名
     * @param {string} prop
     * @returns {string}
     */
    public static kebabToCamelCase(prop: string): string {
        if (!prop.match(/[\-]/g)) return prop;
        return prop.split('-').map((item, index) => {
            if (index == 0) {
                return item;
            } else {
                return item[0].toUpperCase() + item.slice(1);
            }
        }).join('');
    }

    public static randomNumber(min, max, isFloat = false) {
        let r = Math.random() * (max - min + 1);
        if (isFloat) {
            r = r % (max - min);
        } else {
            r = Math.round(r);
            r = r % (max - min + 1);
        }
        r += min;
        return r;
    }

    public static isPrime(num){
        // 不是整数或者数字小于2
        if(!Number.isInteger(num) || num < 2){　// Number.isInteger 判断是否为整数
            return false;
        }

        //2是质数
        if(num == 2){
            return true;
        }else if(num % 2 == 0){ // 排除偶数
            return false;
        }
        // 依次判断是否能被奇数整除，最大循环为数值的开方
        var squareRoot = Math.sqrt(num);
        // 因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
        for(var i = 3; i <= squareRoot; i += 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
}

/*
 * 用于获取dom元素的位置信息
 * */
export class AffixUtils {
    /*
     * 获取元素距离文档的top和left
     * */
    public static offset(elem): any {
        let docElem, win, rect, doc;

        if (!elem) {
            return;
        }

        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return {top: 0, left: 0};
        }

        rect = elem.getBoundingClientRect();

        // Make sure element is not hidden (display: none)
        if (rect.width || rect.height) {
            doc = elem.ownerDocument;
            win = this.getWindow(doc);
            docElem = doc.documentElement;

            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        }

        // Return zeros for disconnected and hidden elements (gh-2310)
        return rect;
    }

    /*
     * 获取页面的纵向滚动距离
     * */
    public static getScrollTop(): number {
        let scrollTop: number;
        if (document.body.scrollTop) {
            scrollTop = document.body.scrollTop
        } else if (document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop
        }
        return scrollTop ? scrollTop : 0;
    }

    public static getWindow(elem): any {
        return this.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    public static isWindow(obj): boolean {
        return obj != null && obj === obj.window;
    }

    /*
     * 获取DTD声明和未声明的body
     *
     * */
    public static getDocumentBody() {
        if (document.compatMode === "CSS1Compat") {
            //DTD已声明
            return document.documentElement;
        } else {
            //DTD未声明
            return document.body;
        }
    }
}
