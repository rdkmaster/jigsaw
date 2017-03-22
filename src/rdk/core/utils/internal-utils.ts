
export class InternalUtils {

    /*
     * 初始化对象标识，转化为数组
     * */
    public static initTrackItemBy(trackItemBy: any, labelField: string): any[] {
        if (!trackItemBy) { //标识没有输入值，采用显示属性名
            trackItemBy = labelField;
        }
        if (trackItemBy.indexOf(",") != -1) { //标识是多个
            return trackItemBy.replace(" ", "").split(",");
        } else { //标识是单个
            return [trackItemBy];
        }
    }
}
