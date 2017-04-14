export class CommonUtils {
    /**
     * 比较两个对象是否相等
     * */
    public static compareWithKeyProperty(item1: any, item2: any, trackItemBy: string[]): boolean{
        for(let i = 0; i < trackItemBy.length; i++){
            if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                return false;
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
    public static extendObject(targetObject:Object, sourceObject:Object):Object {
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
}
