
export class InternalUtils {

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
}
