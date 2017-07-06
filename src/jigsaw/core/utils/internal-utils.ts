export class InternalUtils {
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
        if (prefix == null || prefix == undefined) {
            prefix = this._defaultPrefix;
        }
        return prefix + this._uniqueIdIndex;
    };

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
}
