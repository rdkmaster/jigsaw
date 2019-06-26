import {TranslateService} from "@ngx-translate/core";
import {CallbackRemoval, CommonUtils} from "./common-utils";
import {TranslateHelper} from "./translate-helper";

/**
 * @internal
 */
// @dynamic
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
}

/**
 * 用于获取dom元素的位置信息
 * @internal
 */
// @dynamic
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

/**
 * @internal
 */
export class ElementEventHelper {
    private _eventCaches: ElementEventCache[] = [];

    public put(element: HTMLElement, eventType: string, eventListener: CallbackRemoval) {
        const eventCache = this._findEventCache(element, eventType);
        if (eventCache && !eventCache.handles.find(handle => handle == eventListener)) {
            eventCache.handles.push(eventListener)
        } else {
            this._eventCaches.push({element: element, type: eventType, handles: [eventListener]});
        }
    }

    public get(element: HTMLElement, eventType: string) {
        const eventCache = this._findEventCache(element, eventType);
        return eventCache ? eventCache.handles : null;
    }

    public del(element: HTMLElement, eventType: string, eventListener?: CallbackRemoval) {
        const eventCache = this._findEventCache(element, eventType);
        if (!eventCache) {
            return;
        }
        if (eventListener) {
            const index = eventCache.handles.findIndex(handle => handle == eventListener);
            if (index != -1) {
                eventCache.handles.splice(index, 1);
            }
        } else {
            eventCache.handles = [];
        }
    }

    private _findEventCache(element: HTMLElement, type: string) {
        return this._eventCaches.find(eventCache => eventCache.element === element
            && eventCache.type === type);
    }
}

/**
 * 事件存储及事件服务
 * @internal
 */
export class ElementEventCache {
    element: HTMLElement;
    type: string;
    handles: CallbackRemoval[];
}
