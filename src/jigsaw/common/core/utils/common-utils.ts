import {JigsawArray} from "./data-collection-utils";

// @dynamic
export class CommonUtils {

    // to avoid compodoc generation error
    private static _noDataImageSrc = 'data:image/png;base64,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';
    private static _noDataGraphImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAACQUlEQVRoBe1YzW7CMAymZfftMXbYAyHQLrvsxHnPsOPEaedRxAOhPcdeALq40le5qd0kSyhhFAniOP6P7brMZtf12e12a1i83++fAJd1Xbeb4/G4rqrqkw5L+sGGYHwKCdkcqgdgDVo1aRK+MdYlnTN2GPiBJITOOwwgcjGCLvfVJMe7ZKPoNBGapHkIYgCxHTFVAxjstWWwJdmE2LcMQGgrBPYYcKAx9hg0wgn/hwi4os9FEq0vfZJbo8Lh3ZQbk0QBFRp1ZS4YsKiA3NfKGYy+q6iAmLXy9xHMQ6Yq4IJCPeIh81IQ49EdtxRwURQ/ZVl+pdgXEOKb16D3WVer1asP3UTzHyJgKk/sI5Jv1NRC2khTB6by2lFSEspxWlPjNBz2rmTOFAJHK3CFTGwVIRa6QhbtgcuY8RVQCqZsfD0PYp5kUrh6CiSiEJydVdFZZCu3s8rpQeydOBXE3olTgR2C0P34Cubz+YamClgau2/kpCwsGIa1GVvOpODbjC0fUDStUwSmCFxrBNq3G3IA7SL1Wwk9sPBMoSa6XC7fUgXs7I8CMhTG23AKJ0ZxIIWhmozkA5GmaAgfk2JZ3EBMimXhwNDtuM68UogG8dPp9EzC6M+dxWJxcAke69zrBmjQp2umrz30j2WopsfLAY05B7xXCl3a0KEulcSBc9fIUJdKkkKXrJEkDlwyxW7DAf4azmFEnuM4PNY59DTjNEbqFpk5cPUp1Hmh2W63LybgjyYN7nMOvLHvYF6KNjnbeDu2/QL4HxcXyMyCqAAAAABJRU5ErkJggg==';

    public static noDataImageSrc = CommonUtils._noDataImageSrc;
    public static noDataGraphImageSrc = CommonUtils._noDataGraphImageSrc;

    private static copy(source: Object, isDeep: boolean): Object {
        if (this.isUndefined(source) || typeof source !== 'object') {
            return source;
        }

        let copy = (source instanceof Array) ? [] : {};
        for (let attr in source) {
            if (!source.hasOwnProperty(attr)) {
                continue;
            }
            copy[attr] = isDeep ? CommonUtils.copy(source[attr], true) : source[attr];
        }
        return copy;
    }

    /**
     * 浅拷贝一个对象
     * @param source
     */
    public static shallowCopy(source: Object): Object {
        return CommonUtils.copy(source, false);
    }

    /**
     * 深拷贝一个对象
     * @param source
     */
    public static deepCopy(source: Object): Object {
        return CommonUtils.copy(source, true);
    }

    public static compareValue(item1: any, item2: any, trackItemBy?: string[] | string): boolean {
        // 排除掉非法值和基础类型，如果比对的值是这两种之一的，则采用简单比较方式
        if (this.isUndefined(item1) || this.isUndefined(item2)) {
            return item1 == item2;
        }
        const typeOfItem1 = typeof item1, typeOfItem2 = typeof item2;
        if (typeOfItem1 == 'string' || typeOfItem1 == 'boolean' || typeOfItem1 == 'number' ||
            typeOfItem2 == 'string' || typeOfItem2 == 'boolean' || typeOfItem2 == 'number') {
            return item1 == item2;
        }

        // 对数组类型，认为应该比较各自包含的元素，即不把数组当做对象去比较，因此数组与非数组的比较没有意义
        const isArr1 = item1 instanceof Array || item1 instanceof JigsawArray;
        const isArr2 = item2 instanceof Array || item2 instanceof JigsawArray;
        if ((isArr1 && !isArr2) || (!isArr1 && isArr2)) {
            return false;
        }
        if (isArr1 && isArr2) {
            if (item1.length != item2.length) {
                // 不等长的数组必然不相等
                return false;
            }
            for (let i = 0, len = item1.length; i < len; i++) {
                if (!this.compareValue(item1[i], item2[i], trackItemBy)) {
                    return false;
                }
            }
            return true;
        }

        // 到这里说明item1和item2都是非数组的json对象了
        if (item1 === item2) {
            return true;
        }
        const trackBy: string[] = typeof trackItemBy == 'string' ? trackItemBy.split(/\s*,\s*/) : trackItemBy;
        if (!trackBy || trackBy.length == 0) {
            return item1 == item2;
        }
        for (let i = 0, len = trackBy.length; i < len; i++) {
            if (item1[trackBy[i]] != item2[trackBy[i]]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 比较两个对象是否相等，如果提供`trackItemBy`参数，则只比较`trackItemBy`数组列出的属性是否相等；
     * 如果未提供`trackItemBy`，则按值比较两个对象是否相等。
     *
     * @param item1 待比较的值1
     * @param item2 待比较的值2
     * @param trackItemBy 待比较的属性列表
     */
    public static compareWithKeyProperty(item1: any, item2: any, trackItemBy: string[]): boolean {
        if (trackItemBy && trackItemBy.length > 0) {
            for (let i = 0; i < trackItemBy.length; i++) {
                if (this.isUndefined(item1) || this.isUndefined(item2)) {
                    // 过滤掉 typeof null == 'object'
                    return false;
                } else if (typeof item1 === 'object' && typeof item2 === 'object') {
                    if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 !== 'object' && typeof item2 === 'object') {
                    if (item1 != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 === 'object' && typeof item2 !== 'object') {
                    if (item1[trackItemBy[i]] != item2) {
                        return false;
                    }
                } else {
                    if (item1 != item2) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return item1 == item2;
        }
    }

    /**
     * 判断一个对象是否不包含任何属性
     *
     * @param obj
     *
     */
    public static isEmptyObject(obj): boolean {
        for (let i in obj) {
            return false;
        }
        return true;
    }

    /**
     * 负责两个对象的合并,将sourceObject 中的属性添加到targetObject 中
     *
     * @param targetObject 要合并的源对象
     * @param sourceObject 合并的对象信息
     * @returns 如果`targetObject`非空，则返回`targetObject`，否则返回一个新对象。
     */
    public static extendObject(targetObject: Object, sourceObject: Object): Object {
        if (!sourceObject) {
            return targetObject;
        }

        // 目标对象为空，则直接将对象复制给obj
        if (this.isUndefined(targetObject)) {
            targetObject = {};
        }

        if (typeof targetObject !== 'object' || typeof sourceObject !== 'object') {
            return targetObject;
        }

        for (let i in sourceObject) {
            if (!sourceObject.hasOwnProperty(i)) {
                continue;
            }
            if (typeof sourceObject[i] === "object") {
                // 如果原数据为数组,  而目标数据不是同类型，直接覆盖;
                if (sourceObject[i] instanceof Array && !(targetObject[i] instanceof Array)) {
                    targetObject[i] = sourceObject[i];
                } else if (this.isUndefined(targetObject[i])) {
                    // typeof null is object
                    targetObject[i] = this.isUndefined(sourceObject[i]) ? sourceObject[i] : this.extendObject({}, sourceObject[i]);
                } else {
                    this.extendObject(targetObject[i], sourceObject[i]);
                }
            } else {
                targetObject[i] = sourceObject[i];
            }
        }
        return targetObject;
    }

    public static extendObjects<T = Object>(targetObject: T, ...sources): T {
        sources.forEach(s => {
            targetObject = <T>this.extendObject(targetObject, s);
        });
        return targetObject;
    }

    /**
     * 把一个值转为px或%
     * @param value
     * @returns string
     */
    public static getCssValue(value: string | number): string {
        if (CommonUtils.isUndefined(value)) {
            return null;
        }
        value = typeof value === 'string' ? value : value + '';
        const match = value ? value.match(/^\s*\d+\.*\d*\s*$/) : null;
        return match ? (value + 'px') : value;
    }

    /**
     *
     * @param element
     * @param selector 支持'.className' '#id' '[attr]' 'tagName'
     *
     */
    public static getParentNodeBySelector(element: HTMLElement, selector: string): HTMLElement {
        if (element instanceof HTMLElement) {
            let parent = element.parentElement;
            selector = selector.trim();
            if (selector.match(/^#.+/)) {
                selector = selector.replace("#", '');
                while (parent && parent.getAttribute('id') !== selector) {
                    parent = parent.parentElement;
                }
                return parent;
            } else if (selector.match(/^\..+/)) {
                selector = selector.replace(".", '');
                while (parent && !parent.classList.contains(selector)) {
                    parent = parent.parentElement;
                }
                return parent;
            } else if (selector.match(/^\[.+\]$/)) {
                selector = selector.replace(/[\[\]]/g, '');
                while (parent && !parent.hasAttribute(selector)) {
                    parent = parent.parentElement;
                }
                return parent;
            } else {
                while (parent && parent.tagName.toLowerCase() !== selector) {
                    parent = parent.parentElement;
                }
                return parent;
            }
        } else {
            return null;
        }
    }

    /**
     * 获取浏览器的语言，例如 `"zh"`
     *
     * @returns string
     */
    public static getBrowserLang(): string {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }

        // to avoid compiler mis-error.
        const w: any = window;
        let browserLang: any = w.navigator.languages ? w.navigator.languages[0] : null;
        browserLang = browserLang || w.navigator.language || w.navigator.browserLanguage || w.navigator.userLanguage;

        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }

        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }

        return browserLang;
    }

    /**
     * 获取浏览器的语言，例如 `"zh-CN"`
     *
     * @returns string
     */
    public static getBrowserCultureLang(): string {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }

        // to avoid compiler mis-error.
        const w: any = window;
        let browserCultureLang: any = w.navigator.languages ? w.navigator.languages[0] : null;
        browserCultureLang = browserCultureLang || w.navigator.language || w.navigator.browserLanguage || w.navigator.userLanguage;

        return browserCultureLang;
    }

    /**
     * 安全的调用一个函数，并返回该函数的返回值。如果该函数执行失败，可以在控制台给出实际的堆栈以协助排查问题
     *
     * @param context 执行函数的上下文
     * @param callback 待执行的回调函数
     * @param args 传递给回调函数的参数列表
     * @returns 返回该函数的返回值
     */
    public static safeInvokeCallback(context: any, callback: Function, args?: any[]): any {
        if (CommonUtils.isUndefined(callback)) {
            return;
        }
        try {
            return callback.apply(context, args);
        } catch (e) {
            console.error('invoke callback error: ' + e);
            console.error(e.stack);
        }
    }

    /**
     * 可靠的判断一个值是否有效，输入 `""` 和 `0` 均返回true，只有`null`或者`undefined`才会返回false
     *
     * @param value 待测验的值
     *
     */
    public static isDefined(value): boolean {
        return value !== undefined && value !== null;
    }

    /**
     * 参考 `isDefined`
     *
     * @param value
     *
     */
    public static isUndefined(value): boolean {
        return !this.isDefined(value);
    }

    /**
     * 将url中的参数解析为一个对象
     *
     * @param rawParam 格式为`var1=value1&var2=value2`
     * @returns 返回类似`{var1: "value1", var2: "value2"}`的对象
     */
    public static parseUrlParam(rawParam: string): Object {
        const result = {};
        if (!!rawParam) {
            rawParam.split(/&/g).forEach(param => {
                const parts = param.split(/=/);
                result[this.superDecodeURI(parts[0])] = this.superDecodeURI(parts[1]);
            });
        }
        return result;
    }

    /**
     * 是浏览器内置uri解码`decodeURI()`函数的火力增强版，可以解码任何uri
     *
     * @param uri
     *
     */
    public static superDecodeURI(uri: string): string {
        if (!uri) {
            return uri;
        }
        return decodeURI(uri).replace(/%([0-9a-f]{2})/gi,
            (found, charCode) => String.fromCharCode(parseInt(charCode, 16)));
    }

    /**
     * 判断浏览器是否为IE
     */
    public static isIE(): boolean {
        return !!navigator.userAgent.match(/MSIE|Trident/g);
    }

    public static getBrowserType(): string {
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            return "MSIE";
        }
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            return "Firefox";
        }
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            return "Chrome";
        }
        if (navigator.userAgent.indexOf("Safari") != -1) {
            return "Safari";
        }
        if (navigator.userAgent.indexOf("Opera") != -1) {
            return "Opera";
        }
        return null;
    }

    public static toTrackByFunction(trackBy: string | string[]) {
        return function (index: number, item: any) {
            if (typeof item === 'string') {
                return item;
            }
            if (!trackBy || !item) {
                return index;
            }
            let tracker;
            if (trackBy instanceof Array) {
                try {
                    tracker = JSON.stringify(trackBy.map(t => item[t] + ''));
                } catch (e) {
                    console.error('trackBy value must be javascript native object')
                }
            } else {
                tracker = item[trackBy];
            }
            return tracker;
        }
    }

    /* 文本颜色对比度识别 */
    private static _hexTest = /^#([\da-f]{3}){1,2}$/i;
    private static _hexATest = /^#([\da-f]{4}){1,2}$/i;
    private static _rgbTest =
        /^rgb\(((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?){2}|(((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
    private static _rgbATest =
        /^rgba\(((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
    private static _hslTest =
        /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
    private static _hslATest =
        /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

    public static adjustFontColor(bg: string): "light" | "dark" {
        /*
         * sRGB Luma (ITU Rec. 709)标准
         * L = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
         */
        bg = this.anyToRGB(bg);
        const rgbArr = bg.replace(/[^\d,]/g, "").split(",");
        const r = +rgbArr[0] * 0.2126;
        const g = +rgbArr[1] * 0.7152;
        const b = +rgbArr[2] * 0.0722;
        return (r + g + b) / 255 - 0.5 >= 0 ? "light" : "dark";
    }

    public static hexToRGB(h: string): string {
        if (this._hexTest.test(h)) {
            let r: number | string = 0,
                g: number | string = 0,
                b: number | string = 0;

            if (h.length == 4) {
                r = "0x" + h[1] + h[1];
                g = "0x" + h[2] + h[2];
                b = "0x" + h[3] + h[3];
            } else if (h.length == 7) {
                r = "0x" + h[1] + h[2];
                g = "0x" + h[3] + h[4];
                b = "0x" + h[5] + h[6];
            }

            return `rgb(${+r},${+g},${+b})`;
        } else {
            return "Invalid input color";
        }
    }

    public static hexAToRGBA(h: string): string {
        if (this._hexATest.test(h)) {
            let r: number | string = 0,
                g: number | string = 0,
                b: number | string = 0,
                a: any = 1;

            if (h.length == 5) {
                r = "0x" + h[1] + h[1];
                g = "0x" + h[2] + h[2];
                b = "0x" + h[3] + h[3];
                a = "0x" + h[4] + h[4];
            } else if (h.length == 9) {
                r = "0x" + h[1] + h[2];
                g = "0x" + h[3] + h[4];
                b = "0x" + h[5] + h[6];
                a = "0x" + h[7] + h[8];
            }
            a = +(a / 255).toFixed(3);

            return `rgba(${+r},${+g},${+b},${+a})`;
        } else {
            return "Invalid input color";
        }
    }

    private static _toRGB(h: number, s: number, l: number, a: number = NaN): string {
        if (h >= 360) {
            h %= 360;
        }

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return isNaN(a) ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
    }

    public static hslToRGB(hsl: string): string {
        if (this._hslTest.test(hsl)) {
            const sep = hsl.indexOf(",") > -1 ? "," : " ";
            const hslArr = hsl.substr(4).split(")")[0].split(sep);
            const h: number = +hslArr[0],
                s: number = +hslArr[1].substr(0, hslArr[1].length - 1) / 100,
                l: number = +hslArr[2].substr(0, hslArr[2].length - 1) / 100;
            return this._toRGB(h, s, l);
        } else {
            return "Invalid input color";
        }
    }

    public static hslAToRGBA(hsla: string): string {
        if (this._hslATest.test(hsla)) {
            const sep = hsla.indexOf(",") > -1 ? "," : " ";
            const hslaArr = hsla.substr(5).split(")")[0].split(sep);
            if (hslaArr.indexOf("/") > -1) {
                hslaArr.splice(3, 1);
            }
            const h: number = +hslaArr[0],
                s: number = +hslaArr[1].substr(0, hslaArr[1].length - 1) / 100,
                l: number = +hslaArr[2].substr(0, hslaArr[2].length - 1) / 100,
                a: number = +hslaArr[3];
            return this._toRGB(h, s, l, a);
        } else {
            return "Invalid input color";
        }
    }

    public static nameToRGB(name: string): string {
        if (name === "") {
            return "Invalid input color name";
        }
        let fakeDiv = document.createElement("div");
        fakeDiv.style.color = name;
        document.body.appendChild(fakeDiv);

        let cs = window.getComputedStyle(fakeDiv),
            pv = cs.getPropertyValue("color");

        document.body.removeChild(fakeDiv);

        return pv;
    }

    public static anyToRGB(v: string): string {
        if (this._hexTest.test(v)) {
            v = this.hexToRGB(v);
        } else if (this._hexATest.test(v)) {
            v = this.hexAToRGBA(v);
        } else if (this._hslTest.test(v)) {
            v = this.hslToRGB(v);
        } else if (this._hslATest.test(v)) {
            v = this.hslAToRGBA(v);
        }

        if (this._rgbATest.test(v)) {
            const vArr = v.replace(/[^\d,]/g, "").split(",");
            v = "rgb(" + +vArr[0] + "," + +vArr[1] + "," + +vArr[2] + ")";
        }
        if (!this._rgbTest.test(v)) {
            v = this.nameToRGB(v);
        }
        return v;
    }

    public static getScale(el: HTMLElement, defaultValue: number = 1): number {
        if (!el) {
            return defaultValue;
        }
        const transformScale = el.style?.transform?.match(/scale\(([\d.]+)\)/)?.[1];
        // 当el.style?.scale == ''时，需要取undefined值
        const styleScale = el.style?.scale ? el.style?.scale : undefined;
        const scale = Number(transformScale || styleScale);
        if (!isNaN(scale)) {
            return scale;
        }
        return this.getScale(el.parentElement, defaultValue);
    }
}

export type CallbackRemoval = () => void;

