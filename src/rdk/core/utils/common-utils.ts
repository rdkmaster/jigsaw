export class CommonUtils {

    /**
     * 浅拷贝一个对象
     * @param source
     */
    public static shallowCopy(source: Object): Object {
        if (source === null || source === undefined || typeof source !== 'object') {
            return source;
        }

        let copy = (source instanceof Array) ? [] : {};
        for (let attr in source) {
            if (!source.hasOwnProperty(attr)) continue;
            copy[attr] = CommonUtils.shallowCopy(source[attr]);
        }
        return copy;
    }

    /**
     * 比较两个对象是否相等
     * #1 添加string及简单值 和对象中trackItemBy 属性对比的支持;
     * */
    public static compareWithKeyProperty(item1: any, item2: any, trackItemBy: string[]): boolean {
        for (let i = 0; i < trackItemBy.length; i++) {
            if(typeof item1 === 'object'&& typeof item2 === 'object') {
                if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                    return false;
                }
            } else if(typeof item1 !== 'object'&& typeof item2 === 'object') {
                if (item1 != item2[trackItemBy[i]]) {
                    return false;
                }
            } else if(typeof item1 === 'object'&& typeof item2 !== 'object'){
                if (item1[trackItemBy[i]] != item2) {
                    return false;
                }
            }
        }
        return true;
    }

    // 判断是否是空对象.
    public static isEmptyObject(obj): boolean {
        for (let i in obj) return false;
        return true;
    }

    /**
     * 主要负责两个对象的合并
     * 将sourceObject 中的属性添加到targetObject 中.
     * @param targetObject 要合并的源对象
     * @param sourceObject 合并的对象信息
     */
    public static extendObject(targetObject: Object, sourceObject: Object): Object {
        if (!sourceObject) {
            return targetObject;
        }

        // 目标对象为空，则直接将对象复制给obj
        if (targetObject === null || targetObject === undefined) {
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
                // 如果原数据为数组, 已经是属性的值，直接覆盖;
                if (sourceObject[i] instanceof Array) {
                    targetObject[i] = sourceObject[i];
                } else {
                    this.extendObject(targetObject[i], sourceObject[i]);
                }
            } else {
                targetObject[i] = sourceObject[i];
            }
        }
        return targetObject;
    }

    /**
     * 把一个值转为px或%
     * @param value
     * @returns string
     */
    public static getCssValue(value: string|number): string{
        value = typeof value === 'string' ? value : value + '';
        const match = value ? value.match(/^\s*\d+%|px\s*$/) : null;
        return match ? value : value + 'px';
    }
}
