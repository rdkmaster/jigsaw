/**
 * 比较两个对象是否相等
* */

export class CommonUtils {
    public static compareWithKeyProperty(item1: any, item2: any, trackItemBy: any[]): boolean{
        for(let i = 0; i < trackItemBy.length; i++){
            if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                return false;
            }
        }
        return true;
    }
}
