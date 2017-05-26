import {Time} from "../time/time";
export class RangeTimeCallback{
    public static RecentMonth():[Time,Time]{
        let start = moment().date(1);
        let end = moment();
        return [start,end]
    }
    public static LastMonth():[Time,Time]{
       let start = moment().add(-1,"months").date(1);
       let end = moment().date(1).add(-1,"days");
       return [start,end];
    }

    public static RecentWeek():[Time,Time]{
        let start = moment().day(1);
        let end = moment();
        return [start,end]
    }
    public static LastWeek():[Time,Time]{
        let start = moment().add(-1,"weeks").day(1);
        let end = moment().day(1).add(-1,"days");
        return [start,end];
    }
}
