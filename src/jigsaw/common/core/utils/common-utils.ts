// @dynamic
export class CommonUtils {

    // to avoid compodoc generation error
    private static _noDataImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAGFklEQVRoBe0ZXUibV/TeL4lJNDFGXadtJ+ta6UTKWFkrs9Y6EGRV2EPpHJS9dRtlP+ynL6N1Y1O3Pmy0dA+DPuyhUIa0fZo/CMKs2Dp1FDrYujJdh7OaqjHRxPwY892d8+n9uPnyRb+4tPUhF/Kde84999xzzv05594QsqnS3uN5gwkFhVD8+ANLDKHJYiPxWASrRAJGk1KDDycqDZTSOPxk3ogQ8BERT6MuKMR+mwz7sasZPwvBEPnuhh9ls/dqXS6kUa4qImJJsIM3FDjzFDrHDcGEHm1dUzdAwVptT5e03fbBURpFutqhtfOB4kYknm3cjoAEozK50OdR6vhpadpB1Q6pjFG5oYI2SIvB0NdGmLGjUT5xkK1YV72EyomuFZVFd4q4UodJk8VVJdaxjXdQemol84kDRs4HkMVamnbmKMsSqe8fKVAa78+tDP81E60aGg+qNGyAZWtBqHZABMuuYnMVbCfy2j77KkHzldKZPX8gdC3lhtAIVlEJFxSUj1VKigp15BZtagOlkJclb+CBts6p8191TwXF5bpefWYxtqxdvbpDnOvy7EPGzZaf7vg9sB2Uk1l3ABSOC1f70xv00sCst2N0ZlDLi7hoTdLW0RsZ96F3MRz44Re/JxojpeXbzLdffzEPj+tDevwiTR0A4szli/0+sS2hbpaY8+1ql3ONmBQLEpgB8UciuwtstnHzQmBpFgJCMfhd4cFglpESi4+Bu1YDz8JSuIXJ8pcZEbwmBI6HSH6ePT/5aF1jAItMC8HwMQhl1YSRlxglZQDdgNsIY+BL6gOb70iUjFKLqdNptd7NpIJZWVkPPEYP6O6Di93MuiBPrWbLBpSBTTUAycURA6yrLHga4hlv9NjG2IExxNAAmAdhtm1UOOfDfniPWHcQDBYYNHindCFajkFLHESdg9bOyWU4X5T8SmTA+of1JcRhlRLIoEwCLiJi+qjGAxTOEzyRuffP0M0fR+Yr3jpcXCjSsa7Hrz3uE9XSSgC84fncQzOBmPvykFe5N0BmSVD7pkrHsA57EkmwIKlNJcBNivbeDQ1c6Hu432oh06cOu0sgwkFWunExNACKaajIrW2oUASWQ/K8seQ1DsVFGD8N9zDAiPGds0F+HbpGIH5yQiYgLO83MX2BYgIXsWNcqHYFcPpmIVwDPWkn/OkMJlF6TnI5cnMwA0inoxFeKkmf5TtyP1V38gJjhWQp3AN+O2hEgB4PKIr3udOgtHrwqQNoOwSi0QoWizfJjBwAphdgrtzwvOCG/CwC2ZSPMjIB8FfAb7kc9usgPK6VkcWzHsh6IOuBLeCBlOdcKt3O/+wrCIbC43BFS8pgUvUxRKd03pFr3/3RK+60briGDYAIQdu7pjsYYcdzTHT+VN3TbqcNbpcZKIGIzL7vf+hbjrNCSujVM42lzXDwG0paDCnQ3j39iSzL34DQ2ImqopVni3L0H//+pzH/eJfDV4a9ZnCWRZKk02eOln67kch1DWjtma4jcbkXhOTU7c2fq9njKN5IYCbaB8eCc/33FnGsZWKSGlpeLe1PJVfXgLZe7zMkFhmCOdyx6ymr58TBopJUAh4l/cqI13N/NloCSj4gFtvLZxuK/tWOp5tTs1hkgjOigPXuMJwPYfOBIlK+zSqSkup4q+gY9SbRUxAUx6EjwaGoU5LDdQ3gwvTuRbxNhDGZBi4N+n2gWFnNHiep28uf20QuQvrvBcjgWIBAojrxTk2BG9/mEjn0sfUy8XUN0BeXTLWAIu/Wupx/z8Vv9fwR3AlKliVzwd9qoHhjpXPyuWJTdTo3Iz1ZnJYRA7gwVAwM4ageRMN0jdNjNkJTrn1GGLcqj2IAnrv4Ggv3zTBeB7eqsqgb6qi8HIPOqKfyDyMQl/EpGQyxbVXluV6oI+qKOuO/oxj1TvJGDu0WSsIxpvyLzGlPGtpzkk5QSMfYSQoffFPvEB8QnrSyxsan1+Gy3JxgFr7h0BX5cxBwHKfKmKDHwwV5GL5tXGVm6Qv8n4aPmmAAJ4oQ3ytYMFwPM1QPcXA/ZIuVj8o4VBKy3d/h8ew2BN0+6rD3uSDNFvXJ1rMeyLAH/gPasMvKip60ZAAAAABJRU5ErkJggg==';

    public static noDataImageSrc = CommonUtils._noDataImageSrc;

    private static copy(source: Object, isDeep: boolean): Object {
        if (this.isUndefined(source) || typeof source !== 'object') {
            return source;
        }

        let copy = (source instanceof Array) ? [] : {};
        for (let attr in source) {
            if (!source.hasOwnProperty(attr)) continue;
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

    /**
     * 比较两个对象是否相等，如果提供`trackItemBy`参数，则只比较`trackItemBy`数组列出的属性是否相等；
     * 如果未提供`trackItemBy`，则按值比较两个对象是否相等。
     *
     * @param item1 待比较的值1
     * @param item2 待比较的值2
     * @param trackItemBy 待比较的属性列表
     *
     */
    public static compareWithKeyProperty(item1: any, item2: any, trackItemBy: string[]): boolean {
        if (trackItemBy && trackItemBy.length > 0) {
            for (let i = 0; i < trackItemBy.length; i++) {
                if (!item1 || !item2) {
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
        for (let i in obj) return false;
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
                } else if(this.isUndefined(targetObject[i])) {
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
        if(CommonUtils.isUndefined(value)) return null;
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
        if(navigator.userAgent.indexOf("MSIE")!=-1) {
            return "MSIE";
        }
        if(navigator.userAgent.indexOf("Firefox")!=-1){
            return "Firefox";
        }
        if(navigator.userAgent.indexOf("Chrome")!=-1){
            return "Chrome";
        }
        if(navigator.userAgent.indexOf("Safari")!=-1) {
            return "Safari";
        }
        if(navigator.userAgent.indexOf("Opera")!=-1){
            return "Opera";
        }
        return null;
    }

    public static toTrackByFunction(trackBy: string | string[]) {
        return function (index: number, item: any) {
            if (typeof item === 'string') return item;
            if (!trackBy || !item) return index;
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

    public static adjustFontColor(bg: string): "light" | "dark" {
        /*
         * sRGB Luma (ITU Rec. 709)标准
         * L = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
         *
         */
        bg = this.anyToRGB(bg);
        const rgbArr = bg.replace(/[^\d,]/g, "").split(",");
        const r = +rgbArr[0] * 0.2126;
        const g = +rgbArr[1] * 0.7152;
        const b = +rgbArr[2] * 0.0722;
        const lightness = (r + g + b) / 255 - 0.5 >= 0 ? "light" : "dark";
        return lightness;
    }

    public static hexToRGB(h: string): string {
        const ex = /^#([\da-f]{3}){1,2}$/i;
        if (ex.test(h)) {
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

            return "rgb(" + +r + "," + +g + "," + +b + ")";
        } else {
            return "Invalid input color";
        }
    }

    public static hexAToRGBA(h: string): string {
        const ex = /^#([\da-f]{4}){1,2}$/i;
        if (ex.test(h)) {
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

            return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
        } else {
            return "Invalid input color";
        }
    }

    public static hslToRGB(hsl: string): string {
        const ex =
            /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
        if (ex.test(hsl)) {
            let sep = hsl.indexOf(",") > -1 ? "," : " ";
            let hslArr = hsl.substr(4).split(")")[0].split(sep);

            let h = +hslArr[0],
                s = +hslArr[1].substr(0, hslArr[1].length - 1) / 100,
                l = +hslArr[2].substr(0, hslArr[2].length - 1) / 100;

            if (h >= 360) h %= 360;

            let c = (1 - Math.abs(2 * l - 1)) * s,
                x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
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

            return "rgb(" + +r + "," + +g + "," + +b + ")";
        } else {
            return "Invalid input color";
        }
    }

    public static hslAToRGBA(hsla: string): string {
        const ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
        if (ex.test(hsla)) {
            let sep = hsla.indexOf(",") > -1 ? "," : " ";
            let hslaArr = hsla.substr(5).split(")")[0].split(sep);
    
            if (hslaArr.indexOf("/") > -1)
                hslaArr.splice(3,1);
    
            let h = +hslaArr[0],
                s = +hslaArr[1].substr(0,hslaArr[1].length-1) / 100,
                l = +hslaArr[2].substr(0,hslaArr[2].length-1) / 100,
                a = +hslaArr[3];
            
            if (h >= 360)
                h %= 360;
    
            let c = (1 - Math.abs(2 * l - 1)) * s,
                x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                m = l - c/2,
                r = 0,
                g = 0,
                b = 0;
            
            if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
            }
    
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);
            
            return "rgba("+  +r + ","+ +g + "," + +b + "," + +a + ")";
    
        } else {
            return "Invalid input color";
        }
    }

    public static nameToRGB(name: string): string {
        if (name === ""){
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

    private static HexTest = /^#([\da-f]{3}){1,2}$/i;
    private static HexATest = /^#([\da-f]{4}){1,2}$/i;
    private static RGBTest =
        /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
    private static RGBATest =
        /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
    private static HSLTest =
        /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
    private static HSLATest =
    /   ^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;


    public static anyToRGB(v: string): string {
  
        if (this.HexTest.test(v)) {
            v = this.hexToRGB(v);
        } else if (this.HexATest.test(v)) {
            v = this.hexAToRGBA(v);
        } else if (this.HSLTest.test(v)) {
            v = this.hslToRGB(v);
        } else if (this.HSLATest.test(v)) {
            v = this.hslAToRGBA(v);
        }

        if (this.RGBATest.test(v)) {
            const vArr = v.replace(/[^\d,]/g, "").split(",");
            v = "rgb("+  +vArr[0] + ","+ +vArr[1] + "," + +vArr[2] + ")";
        }
        if (!this.RGBTest.test(v)) {
            v = this.nameToRGB(v);
        }
        return v;
    }
}

export type CallbackRemoval = () => void;

