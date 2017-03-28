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
        for(let i in obj)
            return false;
        return true;
    }
}
